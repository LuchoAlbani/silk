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
      ? `Hola ${nombre},\n\n¡Felicitaciones! Tendrás una sesión gratuita de colorimetría por Zoom.\nEn 24 hs te contactaremos por WhatsApp para coordinar el horario.\n\n¡Gracias por confiar en nosotros!\n\nEquipo Silk`
      : `Hola ${nombre},\n\nGracias por tu interés en descubrir tu paleta de colores.\nAdjuntamos tu guía gratuita de colorimetría y te dejamos acceso exclusivo al blog:\nhttps://www.silk.com.ar/blog/colorimetria\n\n¡Esperamos que te sirva mucho!\n\nEquipo Silk`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: asunto,
      text: mensaje,
    };

    if (!esPresupuestoAlto) {
      const adjuntoPath = path.resolve(__dirname, "assets", "guia-colorimetria.pdf");
      console.log("📎 Adjunto:", adjuntoPath);

      if (!fs.existsSync(adjuntoPath)) {
        console.error("❌ El archivo adjunto no existe:", adjuntoPath);
        res.status(500).send("Archivo adjunto no encontrado.");
        return;
      }


      mailOptions.attachments = [
        {
          filename: "guia-colorimetria.pdf",
          path: adjuntoPath,
        },
      ];
    }

    console.log("📨 Enviando correo a:", email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente.");

    // Guardar datos en Excel
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
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // 🔑 agregamos hoja al workbook
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
