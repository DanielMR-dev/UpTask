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

    // GET ALL
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project'); // Se buscan todas las tareas del proyecto y el projecto
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };

    // GET BY ID
    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task); // Se envía la tarea encontrada en formato JSON
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };

    // UPDATE
    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name // Se actualiza el nombre de la tarea
            req.task.description = req.body.description // Se actualiza la descripción de la tarea
            await req.task.save(); // Se actualiza la tarea en la base de datos
            res.send('Tarea Actualizada correctamente'); 
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };

    // DELETE
    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter( task => task._id.toString() !== req.task.id.toString() ); // Se filtra la tarea a eliminar del proyecto
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]) // Se elimina la tarea y se guarda el proyecto
            res.send('Tarea Eliminada Correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };

    // UPDATE STATUS
    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body; // Se obtiene el nuevo estado de la tarea
            req.task.status = status; // Se actualiza el estado de la tarea
            await req.task.save(); // Se actualiza la tarea en la base de datos
            res.send('Estado de la tarea actualizado correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };
};