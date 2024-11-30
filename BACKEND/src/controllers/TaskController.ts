import type { Request, Response } from "express"; 
import Task from "../models/Task";

export class TaskController {
    // CREATE
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body); // Se crea un nuevo objeto Task con los datos del body
            task.project = req.project.id; // Se establece la relación entre la tarea y el proyecto
            req.project.tasks.push(task.id); // Se agrega el ID de la tarea al array de tareas del proyecto
            // await task.save(); // Se guarda la tarea en la base de datos
            // await req.project.save(); // Se guarda el proyecto en la base de datos
            await Promise.allSettled([task.save(), req.project.save()]); // Se guardan ambos documentos en la base de datos - Mejora en performance y en orden
            res.send('Tarea creada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        };
    };

    // GET
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project'); // Se buscan todas las tareas del proyecto y el projecto
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };
};