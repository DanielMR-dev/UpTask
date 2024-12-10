import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global {
    namespace Express {
        interface Request {
            project: IProject // Se agrega el projecto a Request de Express para manejarlo globalmente
        }
    }
};

export async function projectExist(req : Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params; // Obtiene el ID del projecto desde el parámetro de la URL
        const project = await Project.findById(projectId); // Busca el proyecto en la base de datos

        if(!project) { // Si no se encuentra el projecto se ejecuta el siguiente código
            const error = new Error("Proyecto NO Encontrado");
            res.status(404).json({ error: error.message }); 
            return;
        };
        req.project = project; // Se agrega el proyecto a la solicitud
        next(); // Si existe, pasa al siguiente Middleware
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }  
};