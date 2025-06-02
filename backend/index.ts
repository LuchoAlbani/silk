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
const PORT = 3001; // Puerto en el que se ejecutará el servidor

// Habilita CORS para permitir solicitudes desde diferentes orígenes
app.use(cors());
// Configura body-parser para analizar cuerpos de solicitud JSON y URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura el transportador de correo usando Brevo (Sendinblue)
const transporter = nodemailer.createTransport(
  new BrevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY || "", // Asegúrate de tener tu API_KEY en un archivo .env
  })
);

// Define la ruta POST para manejar las solicitudes del formulario 'frente'
app.post("/frente", async (req: Request, res: Response): Promise<void> => {
  // Desestructura los datos del cuerpo de la solicitud
  const { nombre, apellido, localidad, email, telefono, presupuesto, inicio } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario...");

    // Determina si el presupuesto es alto para personalizar el asunto y contenido
    const esPresupuestoAlto = ["rango3", "rango4", "rango5"].includes(presupuesto);

    const asunto = esPresupuestoAlto
      ? "¡Confirmación de sesión gratuita por Zoom!"
      : "Tu guía de colorimetría gratuita + acceso al blog";

    // Mensaje de texto plano para clientes de correo que no soportan HTML
    // Se elimina la línea horizontal
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

    // Lógica para adjuntar la guía PDF si el presupuesto no es alto
    if (!esPresupuestoAlto) {
      // Asumiendo que la guía PDF sigue en una carpeta 'assets' dentro de 'backend'
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

    // Mensaje HTML del correo, sin el logo, sin la firma detallada y ahora sin la línea horizontal
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


    // Opciones finales del correo
    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_FROM, // Remitente configurado en .env
      to: email,                     // Destinatario del formulario
      subject: asunto,               // Asunto del correo
      text: mensajeTextoPlano,       // Versión de texto plano
      html: mensajeHTML,             // Versión HTML
      attachments,                   // Lista de adjuntos (solo el PDF si aplica)
    };

    console.log("📨 Enviando correo a:", email);
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // --- Lógica para guardar datos en Excel ---
    const dataDir = path.resolve(__dirname, "data");
    // Crea la carpeta 'data' si no existe
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
      console.log("📁 Carpeta 'data' creada.");
    }

    // Determina el nombre del archivo Excel basado en el presupuesto
    const fileName = esPresupuestoAlto ? "frente_alto.xlsx" : "frente_bajo.xlsx";
    const filePath = path.resolve(dataDir, fileName);

    // Nuevo dato a agregar al archivo Excel
    const nuevoDato = {
      Nombre: nombre,
      Apellido: apellido,
      Localidad: localidad,
      Email: email,
      Teléfono: telefono,
      Presupuesto: presupuesto,
      Inicio: inicio,
      Fecha: new Date().toLocaleString(), // Agrega la fecha y hora actual
    };

    let workbook;
    const sheetName = "Respuestas";
    let worksheet;


    

    try {
      // Intenta leer el archivo Excel existente
      const file = fs.readFileSync(filePath);
      workbook = XLSX.read(file, { type: "buffer" });
      worksheet = workbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
    } catch {
      // Si el archivo no existe o hay un error, crea uno nuevo
      console.warn("⚠️ No se encontró archivo Excel existente, se creará uno nuevo.");
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Convierte la hoja de cálculo a JSON, añade el nuevo dato y vuelve a convertir a hoja
    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push(nuevoDato);

    const newSheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newSheet;
    // Escribe el workbook actualizado en el archivo Excel
    XLSX.writeFile(workbook, filePath);

    console.log("📄 Datos guardados en Excel correctamente.");
    res.send("Formulario recibido correctamente.");
  } catch (err) {
    console.error("❌ Error al enviar el correo o guardar datos:", err);
    res.status(500).send("Error procesando el formulario.");
  }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});