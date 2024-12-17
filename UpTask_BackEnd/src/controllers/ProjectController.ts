import type { Request, Response } from "express"
import Project from "../models/Project";

export class ProjectController { // El controlador se encarga de manejar las peticiones y respuestas
    
    // CREATE
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body); // Creamos un nuevo proyecto con los datos del cuerpo de la petición

        // Asignar un Manager
        project.manager = req.user.id; // Asignamos el id del usuario que está haciendo la petición como manager del proyecto

        try {
            await project.save(); // Con save se guarda el projecto en la DB
            res.send('Proyecto Creado Correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    }

    // GET ALL
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: { $in: req.user.id }}, // Traer SOLO los proyectos que el usuario tenga permiso para ver
                    { team: { $in: req.user.id } }, // Si el usuario pertenece a ese equipo también le muestra el proyecto
                ]
            }); // Con find se buscan todos los proyectos en la DB
            res.json(projects); // Se envían los proyectos en formato JSON
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    // GET BY ID
    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params; // Se obtiene el id del proyecto de la URL
        try {
            const project = await Project.findById(id).populate('tasks'); // Con findById se busca un proyecto por id y se llena la propiedad tasks con los datos de la tarea

            if(!project) {
                const error = new Error('Proyecto no encontrado');
                res.status(404).json({ error: error.message}); // Se envía el error en formato JSON
                return;
            };

            if( project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id) ) {
                const error = new Error('Acción no válida');
                res.status(404).json({ error: error.message}); // Se envía el error en formato JSON
                return;
            };

            res.json(project); // Se envía el proyecto en formato JSON
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    // UPDATE
    static updateProject = async (req: Request, res: Response) => {
        try {
            req.project.clientName = req.body.clientName; // Se actualiza el nombre del cliente
            req.project.projectName = req.body.projectName; // Se actualiza el nombre del proyecto
            req.project.description = req.body.description; // Se actualiza la descripción del proyecto

            await req.project.save(); // Se actualiza el proyecto en la DB
            res.send('Proyecto Actualizado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

    // DELETE
    static deleteProject = async (req: Request, res: Response) => {
        try {
            await req.project.deleteOne(); // Se elimina el proyecto de la DB
            res.send('Projecto Eliminado');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' }); // Asegurarse de manejar el error con un mensaje
        };
    };

};