import type { Request, Response } from "express"
import Project from "../models/Project";

export class ProjectController { // El controlador se encarga de manejar las peticiones y respuestas
    
    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body);

        try {
            await project.save() // Con save se guarda el projecto en la DB
            res.send('Proyecto Creado Correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({}); // Con find se buscan todos los proyectos en la DB
            res.json(projects); // Se envían los proyectos en formato JSON
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params; // Se obtiene el id del proyecto de la URL
        try {
            const project = await Project.findById(id); // Se busca el proyecto en la DB por su ID

            if(!project) {
                res.status(400).json({ error: 'Proyecto no encontrado'}); // Se envía el error en formato JSON
                return;
            };

            res.json(project); // Se envía el proyecto en formato JSON
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params; // Se obtiene el id del proyecto de la URL
        try {
            const project = await Project.findByIdAndUpdate(id, req.body); // Se busca el proyecto en la DB por su ID

            if(!project) {
                res.status(400).json({ error: 'Proyecto no encontrado'}); // Se envía el error en formato JSON
                return;
            };

            await project.save(); // Se actualiza el proyecto en la DB
            res.send('Proyecto Actualizado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params; // Se obtiene el id del proyecto de la URL
        try {
            const project = await Project.findById(id); // Se busca el proyecto en la DB por su ID

            if(!project) {
                res.status(400).json({ error: 'Proyecto no encontrado'}); // Se envía el error en formato JSON
                return;
            };

            await project.deleteOne(); // Se elimina el proyecto de la DB
            res.send('Projecto Eliminado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

};