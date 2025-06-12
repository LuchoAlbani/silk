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

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Configuración de Nodemailer con Brevo (antes Sendinblue) ---
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
  let existingData: any[] = [];

  try {
    // Intenta leer el archivo existente
    const fileBuffer = fs.readFileSync(filePath);
    workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[sheetName];
    if (worksheet) {
      existingData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      // Si la hoja no existe en un libro existente, la creamos
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), sheetName);
      console.warn(`⚠️ La hoja '${sheetName}' no existía en '${fileName}', se ha creado.`);
    }
  } catch (error: any) {
    // Si el archivo no existe, crea un nuevo libro de trabajo
    if (error.code === 'ENOENT') {
      console.warn(`⚠️ El archivo Excel '${fileName}' no se encontró, se creará uno nuevo.`);
      workbook = XLSX.utils.book_new();
    } else {
      console.error(`❌ Error al leer el archivo Excel '${fileName}':`, error);
      throw error; // Relanza el error si es algo distinto a "no encontrado"
    }
  }

  // Añade la nueva fila de datos con fecha y hora
  existingData.push({ ...data, FechaRegistro: new Date().toLocaleString("es-AR") });

  // Crea una nueva hoja con los datos actualizados
  const newSheet = XLSX.utils.json_to_sheet(existingData);

  // Reemplaza la hoja antigua o añade la nueva
  workbook.Sheets[sheetName] = newSheet;
  if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
  }

  // Escribe el archivo actualizado
  XLSX.writeFile(workbook, filePath);
  console.log(`📄 Datos guardados en '${fileName}' (Hoja: '${sheetName}') correctamente.`);
}


// --- RUTA PARA EL FORMULARIO 'FRENTE' (EXISTENTE) ---
// Esta ruta permanece sin cambios.
app.post("/frente", async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, localidad, email, telefono, presupuesto, inicio } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario /frente...");

    const esPresupuestoAlto = ["rango3", "rango4", "rango5"].includes(presupuesto);

    const asunto = esPresupuestoAlto
      ? "¡Confirmación de sesión gratuita por Zoom!"
      : "Tu guía de colorimetría gratuita + acceso al blog";

    const mensajeTextoPlano = esPresupuestoAlto
      ? `Hola ${nombre},\n\n¡Felicitaciones! Tendrás una sesión gratuita de colorimetría por Zoom.\nEn 24 hs te contactaremos por WhatsApp para coordinar el horario.\n\n¡Gracias por confiar en nosotros!\n\nEquipo Silk`
      : `Hola ${nombre},\n\nGracias por tu interés en descubrir tu paleta de colores.\nAdjuntamos tu guía gratuita de colorimetría y te dejamos acceso exclusivo al blog:\nhttps://www.silk.com.ar/blog/colorimetria\n\n¡Esperamos que te sirva mucho!\n\nEquipo Silk`;

    const attachments: Mail.Attachment[] = [];

    if (!esPresupuestoAlto) {
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");
      if (fs.existsSync(adjuntoPath)) {
        attachments.push({
          filename: "guia-colorimetria.pdf",
          path: adjuntoPath,
          contentType: "application/pdf",
        });
        console.log("✅ Guía PDF adjuntada para /frente.");
      } else {
         console.error("❌ El archivo adjunto 'guia-colorimetria.pdf' no existe para /frente.");
      }
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
        <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo" style="width: 120px;" />
      </div>`;

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
    console.log("✅ Correo enviado exitosamente para /frente.");

    const excelFileName = esPresupuestoAlto ? "frente_alto.xlsx" : "frente_bajo.xlsx";
    const excelSheetName = "Respuestas";
    const excelData = { Nombre: nombre, Apellido: apellido, Localidad: localidad, Email: email, Teléfono: telefono, Presupuesto: presupuesto, Inicio: inicio };
    await saveToExcel(excelData, excelFileName, excelSheetName);

    res.status(200).send("Formulario /frente recibido correctamente.");
  } catch (err) {
    console.error("❌ Error al procesar el formulario /frente:", err);
    res.status(500).send("Error procesando el formulario /frente.");
  }
});


// --- RUTA CORREGIDA: SERVICIOS CON FILTRO DE PRESUPUESTO ---
app.post("/servicios-filtrado", async (req: Request, res: Response): Promise<void> => {
  const {
    nombre,
    apellido,
    email,
    localidad,
    telefono,
    servicio,
    presupuesto,
    inicio,
    referencia,
    aceptaTerminos,
    recibirEmails,
    otroServicio,
  } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario /servicios-filtrado...");

    const presupuestoAlto = ["rango3", "rango4", "rango5"].includes(presupuesto);

    let asunto: string;
    let mensajeTextoPlano: string;
    let mensajeHTML: string;
    const attachments: Mail.Attachment[] = [];
    let excelFileName: string;
    let excelSheetName: string;

    const serviciosSafe = Array.isArray(servicio) ? servicio : [];
    const serviciosTexto = serviciosSafe.join(", ") + (otroServicio ? ` (Otro: ${otroServicio})` : '');

    if (presupuestoAlto) {
      // Presupuesto alto: confirmación y coordinación
      asunto = "¡Confirmación de Solicitud de Servicio SILK!";
      mensajeTextoPlano = `Hola ${nombre},\n\n¡Gracias por tu solicitud de servicio en SILK!\nNos contactaremos por WhatsApp para coordinar los detalles de tu ${serviciosTexto}.\n\nEquipo Silk`;
      mensajeHTML = `
        <p>Hola ${nombre},</p>
        <p>¡Gracias por tu solicitud de servicio en SILK!</p>
        <p>Nos contactaremos por WhatsApp para coordinar los detalles de tu <b>${serviciosTexto}</b>.</p>
        <p>¡Estamos emocionados de trabajar contigo!</p>
        <br/>
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
          <p>Equipo Silk</p>
          <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo" style="width: 120px;" />
        </div>`;
      excelFileName = "servicios_clientes_aptos.xlsx";
      excelSheetName = "Clientes_Aptos";
    } else {
      // Presupuesto bajo: mensaje de agenda llena y obsequio (guía PDF)
      asunto = "¡Información Importante sobre tu Solicitud de Servicio SILK!";
      mensajeTextoPlano = `Hola ${nombre},\n\nActualmente nuestra agenda está completa para tu rango de presupuesto.\nTe añadimos a la lista de espera y te enviamos nuestra guía gratuita de colorimetría.\n\nEquipo Silk`;
      mensajeHTML = `
        <p>Hola ${nombre},</p>
        <p>Nuestra agenda está completa para tu rango de presupuesto.</p>
        <p>Te hemos añadido a la lista de espera y te enviamos nuestra guía gratuita de colorimetría.</p>
        <br/>
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
          <p>Equipo Silk</p>
          <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo" style="width: 120px;" />
        </div>`;

      // Adjuntar PDF guía
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");
      if (fs.existsSync(adjuntoPath)) {
        attachments.push({
          filename: "guia-colorimetria.pdf",
          path: adjuntoPath,
          contentType: "application/pdf",
        });
        console.log("✅ Guía PDF adjuntada para presupuesto bajo.");
      } else {
        console.error("❌ No se encontró el archivo guia-colorimetria.pdf para adjuntar.");
      }

      excelFileName = "servicios_lista_espera_presupuesto.xlsx";
      excelSheetName = "Lista_Espera_Presupuesto";
    }

    // Siempre enviar correo, independientemente del presupuesto
    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensajeTextoPlano,
      html: mensajeHTML,
      attachments,
    };

    console.log(`📨 Enviando correo a ${email}...`);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // Guardar en Excel
    const excelData = {
      Nombre: nombre,
      Apellido: apellido,
      Email: email,
      Localidad: localidad,
      Telefono: telefono,
      Servicios: serviciosTexto,
      OtroServicio: otroServicio || "N/A",
      Presupuesto: presupuesto,
      Inicio: inicio,
      Referencia: referencia,
      AceptaTerminos: aceptaTerminos ? "Sí" : "No",
      RecibirEmails: recibirEmails ? "Sí" : "No",
    };
    await saveToExcel(excelData, excelFileName, excelSheetName);

    res.status(200).send("Formulario de servicios procesado correctamente.");

  } catch (error) {
    console.error("❌ Error al procesar /servicios-filtrado:", error);
    res.status(500).send("Error interno al procesar la solicitud de servicio.");
  }
});

// --- RUTA ACTUALIZADA: LISTA DE ESPERA PARA "COACH DE IMAGEN" ---
app.post("/lista-espera-coach", async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, email, telefono } = req.body;

  try {
    console.log(`📩 Recibida solicitud en /lista-espera-coach para ${email}`);

    const asunto = "Confirmación de Inscripción en Lista de Espera - Coach de Imagen SILK";
    const mensajeHTML = `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por tu interés en nuestro servicio de <strong>Coach de Imagen</strong>!</p>
      <p>Te has registrado con éxito en nuestra lista de espera. Te notificaremos por correo electrónico cuando el servicio esté disponible para inscripciones.</p>
      <p>¡Gracias por tu paciencia y confianza!</p>
      <br/>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
          <p>Equipo Silk</p>
          <img src="https://www.silk.com.ar/images/silk_logo-black.png" alt="SILK Logo" style="width: 120px;" />
      </div>`;
            
    const mailOptions: Mail.Options = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: asunto,
        html: mensajeHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo de confirmación de lista de espera enviado a ${email}.`);
        
    const excelFileName = "lista_espera_coach_imagen.xlsx";
    const excelSheetName = "Inscriptos";
    const excelData = { Nombre: nombre, Apellido: apellido, Email: email, Telefono: telefono || "N/A" };
    await saveToExcel(excelData, excelFileName, excelSheetName);
        
    res.status(200).send("Inscripción a la lista de espera recibida correctamente.");

  } catch (error) {
    console.error("❌ Error al procesar /lista-espera-coach:", error);
    res.status(500).send("Error interno al procesar la inscripción a la lista de espera.");
  }
});


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
