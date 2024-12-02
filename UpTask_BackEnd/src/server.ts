import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const app = express(); // Generar la aplicacion de express
app.use(cors(corsConfig)); // Se permite la conexión por cors con la configuración establecida

app.use(express.json()); // Habilita la lectura de JSON a través del body con ThunderClient

// Routes
app.use('/api/projects', projectRoutes);

export default app