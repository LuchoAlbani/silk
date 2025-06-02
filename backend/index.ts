import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as XLSX from "xlsx";
import cors from "cors";
import BrevoTransport from "nodemailer-brevo-transport";

// Carga las variables de entorno desde un archivo .env
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport(
  new BrevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY || "",
  })
);

// --- Función Auxiliar para Guardar en Excel ---
async function saveToExcel(
  data: Record<string, any>,
  fileName: string,
  sheetName: string
): Promise<void> {
  const dataDir = path.resolve(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log(`📁 Carpeta 'data' creada en: ${dataDir}`);
  }

  const filePath = path.resolve(dataDir, fileName);
  let workbook: XLSX.WorkBook;
  let worksheet: XLSX.WorkSheet;
  let existingData: any[] = [];

  try {
    const fileBuffer = fs.readFileSync(filePath);
    workbook = XLSX.read(fileBuffer, { type: "buffer" });
    if (workbook.SheetNames.includes(sheetName)) {
      worksheet = workbook.Sheets[sheetName]!;
      existingData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      console.warn(`⚠️ La hoja '${sheetName}' no existe en '${fileName}', se creará una nueva.`);
      workbook = XLSX.utils.book_new(); // Crear un nuevo libro si no existe la hoja
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), sheetName); // Añadir hoja vacía
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') { // Archivo no encontrado
      console.warn(`⚠️ El archivo Excel '${fileName}' no se encontró, se creará uno nuevo.`);
    } else {
      console.error(`❌ Error al leer el archivo Excel '${fileName}':`, error);
    }
    workbook = XLSX.utils.book_new();
    existingData = [];
  }

  existingData.push({ ...data, Fecha: new Date().toLocaleString() }); // Agrega fecha y hora

  const newSheet = XLSX.utils.json_to_sheet(existingData);
  workbook.Sheets[sheetName] = newSheet;

  // Si se creó un nuevo libro, asegúrate de que la hoja esté en SheetNames
  if (!workbook.SheetNames.includes(sheetName)) {
      XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
  }

  XLSX.writeFile(workbook, filePath);
  console.log(`📄 Datos guardados en '${fileName}' en la hoja '${sheetName}' correctamente.`);
}


// --- RUTA PARA EL FORMULARIO 'FRENTE' (EXISTENTE) ---
app.post("/frente", async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, localidad, email, telefono, presupuesto, inicio } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario /frente...");

    const esPresupuestoAlto = ["rango3", "rango4", "rango5"].includes(presupuesto);

    const asunto = esPresupuestoAlto
      ? "¡Confirmación de sesión gratuita por Zoom!"
      : "Tu guía de colorimetría gratuita + acceso al blog";

    const mensajeTextoPlano = esPresupuestoAlto
      ? `Hola ${nombre},

¡Felicitaciones! Tendrás una sesión gratuita de colorimetría por Zoom.
En 24 hs te contactaremos por WhatsApp para coordinar el horario.

¡Gracias por confiar en nosotros!

Equipo Silk`
      : `Hola ${nombre},

Gracias por tu interés en descubrir tu paleta de colores.
Adjuntamos tu guía gratuita de colorimetría y te dejamos acceso exclusivo al blog:
https://www.silk.com.ar/blog/colorimetria

¡Esperamos que te sirva mucho!

Equipo Silk`;

    const attachments: Mail.Attachment[] = [];

    if (!esPresupuestoAlto) {
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");

      if (!fs.existsSync(adjuntoPath)) {
        console.error("❌ El archivo adjunto de la guía 'guia-colorimetria.pdf' no existe:", adjuntoPath);
        res.status(500).send("Archivo adjunto de la guía no encontrado.");
        return;
      }

      attachments.push({
        filename: "guia-colorimetria.pdf",
        path: adjuntoPath,
        contentType: "application/pdf",
      });
      console.log("✅ Guía PDF adjuntada.");
    }

    const mensajeHTML = `
      <p>Hola ${nombre},</p>
      <p>${
        esPresupuestoAlto
          ? "¡Felicitaciones! Tendrás una sesión gratuita de colorimetría por Zoom.<br/>En 24 hs te contactaremos por WhatsApp para coordinar el horario."
          : "Gracias por tu interés en descubrir tu paleta de colores.<br/>Adjuntamos tu guía gratuita de colorimetría y te dejamos acceso exclusivo al blog:<br/><a href='https://www.silk.com.ar/blog/colorimetria'>https://www.silk.com.ar/blog/colorimetria</a>"
      }</p>
      <p>¡Esperamos que te sirva mucho!</p>
      <br/>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
        <p>Equipo Silk</p>
        <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo"
      style="width: 120px; display: block; margin: 20px auto 0;" />
      </div>
    `;

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensajeTextoPlano,
      html: mensajeHTML,
      attachments,
    };

    console.log("📨 Enviando correo a:", email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // Guardar datos en Excel usando la función auxiliar
    const excelFileName = esPresupuestoAlto ? "frente_alto.xlsx" : "frente_bajo.xlsx";
    const excelSheetName = "Respuestas";
    const excelData = {
      Nombre: nombre,
      Apellido: apellido,
      Localidad: localidad,
      Email: email,
      Teléfono: telefono,
      Presupuesto: presupuesto,
      Inicio: inicio,
    };
    await saveToExcel(excelData, excelFileName, excelSheetName);

    res.send("Formulario recibido correctamente.");
  } catch (err) {
    console.error("❌ Error al enviar el correo o guardar datos para /frente:", err);
    res.status(500).send("Error procesando el formulario /frente.");
  }
});

// --- RUTA PARA LOS SERVICIOS CON FILTRO DE PRESUPUESTO (Personal Shopping/Detox y Asesoramiento de Imagen) ---
app.post("/servicios-filtrado", async (req: Request, res: Response): Promise<void> => {
  const {
    nombre,
    apellido,
    email,
    localidad,
    telefono,
    servicio, // Array de strings
    presupuesto,
    inicio,
    referencia,
    aceptaTerminos,
    recibirEmails,
    otroServicio, // Si se seleccionó "Otro"
  } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario /servicios-filtrado...");

    // Define los rangos de presupuesto que cumplen el "mínimo requerido"
    const presupuestoRequerido = ["rango3", "rango4", "rango5"]; // Ej. $250.000+
    const cumpleRequisito = presupuestoRequerido.includes(presupuesto);

    let asunto: string;
    let mensajeTextoPlano: string;
    let mensajeHTML: string;
    const attachments: Mail.Attachment[] = [];
    let excelFileName: string;
    let excelSheetName: string;
    let excelData: Record<string, any>;

    if (cumpleRequisito) {
      // Si el cliente tiene el mínimo requerido
      asunto = "¡Confirmación de Solicitud de Servicio SILK!";
      mensajeTextoPlano = `Hola ${nombre},

¡Gracias por tu solicitud de servicio en SILK!
Hemos recibido tus datos y pronto nos pondremos en contacto contigo por WhatsApp (en las próximas 24 hs.) para coordinar todos los detalles de tu ${servicio.join(", ")}.

¡Estamos emocionados de trabajar contigo!

Resumen de tu solicitud:
Servicios interesados: ${servicio.join(", ")} ${otroServicio ? ` (Otro: ${otroServicio})` : ''}
Presupuesto indicado: ${presupuesto}
Cuándo te gustaría empezar: ${inicio}
Cómo nos conociste: ${referencia}

Equipo Silk`;

      mensajeHTML = `
        <p>Hola ${nombre},</p>
        <p>¡Gracias por tu solicitud de servicio en SILK!</p>
        <p>Hemos recibido tus datos y pronto nos pondremos en contacto contigo por WhatsApp (en las próximas 24 hs.) para coordinar todos los detalles de tu ${servicio.join(", ")}.</p>
        <p>¡Estamos emocionados de trabajar contigo!</p>
        <p><b>Resumen de tu solicitud:</b></p>
        <ul>
          <li><b>Servicios interesados:</b> ${servicio.join(", ")} ${otroServicio ? ` (Otro: ${otroServicio})` : ''}</li>
          <li><b>Presupuesto indicado:</b> ${presupuesto}</li>
          <li><b>Cuándo te gustaría empezar:</b> ${inicio}</li>
          <li><b>Cómo nos conociste:</b> ${referencia}</li>
        </ul>
        <br/>
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
          <p>Equipo Silk</p>
          <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo"
        style="width: 120px; display: block; margin: 20px auto 0;" />
        </div>
      `;

      excelFileName = "servicios_clientes_aptos.xlsx";
      excelSheetName = "Clientes_Aptos";
      excelData = {
        Nombre: nombre,
        Apellido: apellido,
        Email: email,
        Localidad: localidad,
        Telefono: telefono,
        Servicios: servicio.join(", "),
        OtroServicio: otroServicio,
        Presupuesto: presupuesto,
        Inicio: inicio,
        Referencia: referencia,
        AceptaTerminos: aceptaTerminos ? "Sí" : "No",
        RecibirEmails: recibirEmails ? "Sí" : "No",
      };

    } else {
      // Si el cliente NO llega al mínimo requerido
      asunto = "¡Información Importante sobre tu Solicitud de Servicio SILK!";
      mensajeTextoPlano = `Hola ${nombre},

¡Gracias por tu interés en los servicios de SILK!

Actualmente, debido a la alta demanda y para mantener la calidad de nuestros servicios, estamos con la agenda completa y no estamos tomando nuevos clientes con tu rango de presupuesto.

Sin embargo, te hemos añadido a nuestra lista de espera y te contactaremos en cuanto tengamos disponibilidad para un servicio que se ajuste a tus necesidades.

Mientras tanto, te dejamos un obsequio especial para que empieces a explorar tu imagen. Adjuntamos tu guía gratuita de colorimetría. ¡Esperamos que te sirva mucho!

Equipo Silk`;

      mensajeHTML = `
        <p>Hola ${nombre},</p>
        <p>¡Gracias por tu interés en los servicios de SILK!</p>
        <p>Actualmente, debido a la alta demanda y para mantener la calidad de nuestros servicios, estamos con la agenda completa y no estamos tomando nuevos clientes con tu rango de presupuesto.</p>
        <p>Sin embargo, te hemos añadido a nuestra lista de espera y te contactaremos en cuanto tengamos disponibilidad para un servicio que se ajuste a tus necesidades.</p>
        <p>Mientras tanto, te dejamos un obsequio especial para que empieces a explorar tu imagen. Adjuntamos tu guía gratuita de colorimetría. ¡Esperamos que te sirva mucho!</p>
        <br/>
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
          <p>Equipo Silk</p>
          <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo"
        style="width: 120px; display: block; margin: 20px auto 0;" />
        </div>
      `;

      // Adjuntar el obsequio de colorimetría
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");
      if (!fs.existsSync(adjuntoPath)) {
        console.error("❌ El archivo adjunto de la guía 'guia-colorimetria.pdf' no existe para el obsequio:", adjuntoPath);
        // Puedes optar por no enviar el correo o enviar sin adjunto si no existe
      } else {
        attachments.push({
          filename: "guia-colorimetria.pdf",
          path: adjuntoPath,
          contentType: "application/pdf",
        });
        console.log("✅ Guía PDF adjuntada como obsequio.");
      }

      excelFileName = "servicios_lista_espera_presupuesto.xlsx";
      excelSheetName = "Lista_Espera_Presupuesto";
      excelData = {
        Nombre: nombre,
        Apellido: apellido,
        Email: email,
        Localidad: localidad,
        Telefono: telefono,
        Servicios: servicio.join(", "),
        OtroServicio: otroServicio,
        Presupuesto: presupuesto,
        Inicio: inicio,
        Referencia: referencia,
        AceptaTerminos: aceptaTerminos ? "Sí" : "No",
        RecibirEmails: recibirEmails ? "Sí" : "No",
      };
    }

    // Envío del correo
    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensajeTextoPlano,
      html: mensajeHTML,
      attachments,
    };

    console.log("📨 Enviando correo a:", email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // Guardar datos en Excel
    await saveToExcel(excelData, excelFileName, excelSheetName);

    res.send("Formulario de servicios procesado correctamente.");

  } catch (err) {
    console.error("❌ Error al procesar el formulario de servicios filtrados:", err);
    res.status(500).send("Error procesando el formulario de servicios filtrados.");
  }
});


// --- RUTA PARA EL SERVICIO 'COACH DE IMAGEN' (Lista de Espera del Modal) ---
app.post("/lista-espera-coach", async (req: Request, res: Response): Promise<void> => {
  // Asumo un formulario simple para la lista de espera del modal
  const { nombre, email, telefono } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario /lista-espera-coach...");

    const asunto = "Confirmación de Inscripción en Lista de Espera - Coach de Imagen SILK";
    const mensajeTextoPlano = `Hola ${nombre},

¡Gracias por tu interés en nuestro servicio de Coach de Imagen!
Te has registrado con éxito en nuestra lista de espera.

Te notificaremos por correo electrónico cuando el servicio de Coach de Imagen esté disponible para inscripciones.

¡Gracias por tu paciencia y confianza!

Equipo Silk`;

    const mensajeHTML = `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por tu interés en nuestro servicio de Coach de Imagen!</p>
      <p>Te has registrado con éxito en nuestra lista de espera.</p>
      <p>Te notificaremos por correo electrónico cuando el servicio de Coach de Imagen esté disponible para inscripciones.</p>
      <br/>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
        <p>Equipo Silk</p>
        <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo"
      style="width: 120px; display: block; margin: 20px auto 0;" />
      </div>
    `;

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensajeTextoPlano,
      html: mensajeHTML,
    };

    console.log("📨 Enviando correo de confirmación de lista de espera a:", email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo de lista de espera enviado exitosamente.");

    // Guardar datos en Excel para la lista de espera de Coach de Imagen
    const excelFileName = "lista_espera_coach_imagen.xlsx";
    const excelSheetName = "Coach_Imagen_Espera";
    const excelData = {
      Nombre: nombre,
      Email: email,
      Telefono: telefono || "N/A", // El teléfono puede ser opcional aquí
    };
    await saveToExcel(excelData, excelFileName, excelSheetName);

    res.send("Inscripción en lista de espera recibida correctamente.");

  } catch (err) {
    console.error("❌ Error al procesar el formulario de lista de espera de Coach de Imagen:", err);
    res.status(500).send("Error procesando el formulario de lista de espera de Coach de Imagen.");
  }
});


// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});