import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as XLSX from "xlsx";
import cors from "cors";
import BrevoTransport from "nodemailer-brevo-transport";

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

app.post("/frente", async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, localidad, email, telefono, presupuesto, inicio } = req.body;

  try {
    console.log("📩 Inicio de procesamiento de formulario...");

    const esPresupuestoAlto = ["rango3", "rango4", "rango5"].includes(presupuesto);

    const asunto = esPresupuestoAlto
      ? "¡Confirmación de sesión gratuita por Zoom!"
      : "Tu guía de colorimetría gratuita + acceso al blog";

    const mensaje = esPresupuestoAlto
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

    const mensajeHTML = `
      <p>Hola ${nombre},</p>
      <p>${
        esPresupuestoAlto
          ? "¡Felicitaciones! Tendrás una sesión gratuita de colorimetría por Zoom.<br/>En 24 hs te contactaremos por WhatsApp para coordinar el horario."
          : "Gracias por tu interés en descubrir tu paleta de colores.<br/>Adjuntamos tu guía gratuita de colorimetría y te dejamos acceso exclusivo al blog:<br/><a href='https://www.silk.com.ar/blog/colorimetria'>https://www.silk.com.ar/blog/colorimetria</a>"
      }</p>
      <p>¡Esperamos que te sirva mucho!</p>
      <br/>
      <p><strong>Equipo Silk</strong></p>
      <img src="cid:logo_silk" style="width:150px; margin-top:10px;" />
    `;

    const logoPath = path.resolve(__dirname, "..", "public", "images", "silk_logo-black.png");

    // **AÑADIDO PARA DEPURACIÓN:** Verifica que la ruta del logo sea correcta
    console.log("Ruta del logo:", logoPath);
    if (!fs.existsSync(logoPath)) {
        console.error("❌ El archivo del logo no existe en la ruta especificada:", logoPath);
        // Opcional: podrías decidir si quieres lanzar un error o continuar sin el logo
    }

    // MODIFICACIÓN IMPORTANTE: Especificar los tipos de 'contentDisposition' y añadir 'contentType'
    const attachments: Array<{
      filename: string;
      path: string;
      cid?: string;
      contentDisposition?: 'inline' | 'attachment'; // Tipo literal para contentDisposition
      contentType?: string; // Tipo MIME para el contenido
    }> = [
      {
        filename: "silk_logo-black.png", // Puedes probar con un nombre más genérico como "logo.png" si el problema persiste
        path: logoPath,
        cid: "logo_silk",
        contentDisposition: "inline", // Crucial para incrustar
        contentType: "image/png", // Asegúrate de que sea el tipo MIME correcto para tu imagen
      },
    ];

    // Si es presupuesto bajo, también adjuntamos la guía PDF
    if (!esPresupuestoAlto) {
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");

      if (!fs.existsSync(adjuntoPath)) {
        console.error("❌ El archivo adjunto de la guía no existe:", adjuntoPath);
        res.status(500).send("Archivo adjunto de la guía no encontrado.");
        return;
      }

      attachments.push({
        filename: "guia-colorimetria.pdf",
        path: adjuntoPath,
        contentType: "application/pdf" // Es buena práctica especificar el tipo MIME también para otros adjuntos
      });
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensaje.replace(/\n/g, " "),
      html: mensajeHTML,
      attachments,
    };

    console.log("📨 Enviando correo a:", email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // Guardado de datos en Excel
    const dataDir = path.resolve(__dirname, "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
      console.log("📁 Carpeta 'data' creada.");
    }

    const fileName = esPresupuestoAlto ? "frente_alto.xlsx" : "frente_bajo.xlsx";
    const filePath = path.resolve(dataDir, fileName);

    const nuevoDato = {
      Nombre: nombre,
      Apellido: apellido,
      Localidad: localidad,
      Email: email,
      Teléfono: telefono,
      Presupuesto: presupuesto,
      Inicio: inicio,
      Fecha: new Date().toLocaleString(),
    };

    let workbook;
    const sheetName = "Respuestas";
    let worksheet;

    try {
      const file = fs.readFileSync(filePath);
      workbook = XLSX.read(file, { type: "buffer" });
      worksheet = workbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
    } catch {
      console.warn("⚠️ No se encontró archivo Excel existente, se creará uno nuevo.");
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push(nuevoDato);

    const newSheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newSheet;
    XLSX.writeFile(workbook, filePath);

    res.send("Formulario recibido correctamente.");
  } catch (err) {
    console.error("❌ Error al enviar el correo o guardar datos:", err);
    res.status(500).send("Error procesando el formulario.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});