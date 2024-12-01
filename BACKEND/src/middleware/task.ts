import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task: ITask // Añadir la interfaz de la tarea a Request
        }
    }
};

export async function taskExist(req : Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params; // Obtiene el ID de la tarea desde el parámetro de la URL
        const task = await Task.findById(taskId); // Busca la tarea en la DB

        if(!task) { // Si no se encuentra la tarea se ejecuta el siguiente código
            const error = new Error("Tarea NO Encontrada");
            res.status(404).json({ error: error.message}); // Se envía el error en formato JSON
            return;
        };
        req.task = task; // Se agrega la tarea a la solicitud
        next(); // Si existe, pasa al siguiente Middleware
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }  
};

export function taskBelongsToProject(req : Request, res: Response, next: NextFunction) {
    if(req.task.project.toString() !== req.project.id.toString()) { // Se verifica si la tarea pertenece al proyecto actual
        const error = new Error('La Tarea no pertenece al proyecto'); // Si no pertenece se crea un error
        res.status(400).json({ error: error.message});
        return;
    };
    next(); // Si pertenece, pasa al siguiente Middleware
};