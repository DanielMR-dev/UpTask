import type { Request, Response } from "express"
import Project from "../models/Project";

export class ProjectController {
    
    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body);

        try {
            await project.save() // Con save se guarda el projecto en la DB
            res.send('Proyecto Creado Correctamente');
        } catch (error) {
            console.log(error);
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Todos los proyectos');
    }

};