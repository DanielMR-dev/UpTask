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
            const { taskId } = req.params;
            const task = await Task.findById(taskId); // Se busca la tarea por ID

            if(!task) { // Si no existe la tarea
                const error = new Error('Tarea no encontrada');
                res.status(404).json({ error: error.message});
                return;
            };

            if(task.project.toString() !== req.project.id) { // Se verifica si la tarea pertenece al proyecto actual
                const error = new Error('La Tarea no pertenece al proyecto');
                res.status(400).json({ error: error.message});
                return;
            }

            res.json(task); // Se envía la tarea encontrada en formato JSON
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };

    // UPDATE
    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const task = await Task.findByIdAndUpdate(taskId, req.body); // Se busca la tarea por ID y se actualiza con los datos del body

            if(!task) { // Si no existe la tarea
                const error = new Error('Tarea no encontrada');
                res.status(404).json({ error: error.message});
                return;
            };
            
            if(task.project.toString() !== req.project.id) { // Se verifica si la tarea pertenece al proyecto actual
                const error = new Error('La Tarea no pertenece al proyecto');
                res.status(400).json({ error: error.message});
                return;
            }

            res.send('Tarea Actualizada correctamente'); 
        } catch (error) {
            res.status(500).json({ error: 'Server Error' });
        }
    };
};