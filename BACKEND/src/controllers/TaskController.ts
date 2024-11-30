import type { Request, Response } from "express"; 
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {

        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if(!project) {
            const error = new Error("Project not found");
            res.status(404).json({ error: error.message}); // Se envía el error en formato JSON
            return;
        };

        try {
            const task = new Task(req.body); // Se crea un nuevo objeto Task con los datos del body
            task.project = project.id; // Se establece la relación entre la tarea y el proyecto
            project.tasks.push(task.id); // Se agrega el ID de la tarea al array de tareas del proyecto
            await task.save(); // Se guarda el nuevo Task en la base de datos
            await project.save(); // Se guarda el proyecto actualizado en la base de datos
            res.send('Tarea creada correctamente');
        } catch (error) {
            console.log(error);
        };
    };
};