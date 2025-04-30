import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as XLSX from "xlsx";
import cors from "cors";
import BrevoTransport from "nodemailer-brevo-transport";  // Asegúrate de importar correctamente

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crear el transportador con Brevo usando 'new'
const transporter = nodemailer.createTransport(
  new BrevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY || "",
  })
);

app.post("/frente", async (req: Request, res: Response) => {
  const { nombre, apellido, localidad, email, telefono, presupuesto, inicio } = req.body;

  try {
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
      mailOptions.attachments = [
        {
          filename: "guia-colorimetria.pdf",
          path: path.resolve(__dirname, "assets", "guia-colorimetria.pdf"),
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    // Guardar datos en Excel
    const fileName = esPresupuestoAlto ? "frente_alto.xlsx" : "frente_bajo.xlsx";
    const filePath = path.resolve(__dirname, "data", fileName);

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
    try {
      const file = fs.readFileSync(filePath);
      workbook = XLSX.read(file, { type: "buffer" });
    } catch {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = "Respuestas";
    const worksheet = workbook.Sheets[sheetName]
      ? workbook.Sheets[sheetName]
      : XLSX.utils.json_to_sheet([]);

    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push(nuevoDato);

    const newSheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newSheet;
    XLSX.writeFile(workbook, filePath);

    res.send("Formulario recibido correctamente.");
  } catch (err) {
    console.error("Error al enviar el correo o guardar datos:", err);
    res.status(500).send("Error procesando el formulario.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
