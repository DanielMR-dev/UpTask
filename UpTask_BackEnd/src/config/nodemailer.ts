import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Leer las variables de entorno

const config = () => {
    return {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    };
}; 

// Con transporter va a cargar la configuraciones para enviar el email
export const transporter = nodemailer.createTransport(config()); 