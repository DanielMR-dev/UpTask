import type { Request, Response } from "express"; 
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body); // Se crea un nuevo objeto Task con los datos del body
            task.project = req.project.id; // Se establece la relación entre la tarea y el proyecto
            req.project.tasks.push(task.id); // Se agrega el ID de la tarea al array de tareas del proyecto
            await task.save(); // Se guarda el nuevo Task en la base de datos
            await req.project.save(); // Se guarda el proyecto actualizado en la base de datos
            res.send('Tarea creada correctamente');
        } catch (error) {
            console.log(error);
        };
    };
};