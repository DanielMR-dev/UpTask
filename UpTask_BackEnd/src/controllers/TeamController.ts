import type { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export class TeamMemberController {
    // FIND USER
    static findUserByEmail = async (req: Request, res: Response) => {
        const { email } = req.body; // Obtener el email del body de la petición
        const user = await User.findOne({ email }).select('id email name'); // Buscar un usuario con el email proporcionado
        if(!user) {
            const error = new Error('Usuario no encontrado');
            res.status(404).json({ error: error.message}); // 404 para no encontrado
            return;
        };
        res.json(user);
    };

    // GET PROJECT TEAM
    static getProjectTeam = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: 'id email name'
        }); // Buscar el proyecto con el id proporcionado y obtener el equipo
        res.json(project.team);
    };

    // ADD USER
    static addUserById = async (req: Request, res: Response) => {
        const { id } = req.body; // Obtener el id del body de la petición
        const user = await User.findById(id).select('id'); // Buscar un usuario con el id proporcionado
        if(!user) {
            const error = new Error('Usuario no encontrado');
            res.status(404).json({ error: error.message}); // 404 para no encontrado
            return;
        };

        if(req.project.team.some(team => team.toString() === user.id.toString())) { // Verificar si el usuario ya está en el equipo
            const error = new Error('El Usuario ya existe en el Proyecto');
            res.status(409).json({ error: error.message}); // 409 para un conflicto
            return;
        };

        req.project.team.push(user.id); // Agregar el id del usuario al array de equipo del proyecto
        await req.project.save(); // Guardar los cambios en el proyecto
        res.send('Usuario agregado correctamente');
    };

    // REMOVE USER
    static removeUserById = async (req: Request, res: Response) => {
        const { id } = req.body; // Obtener el id del body de la petición
        if(!req.project.team.some(team => team.toString() === id.toString())) { // Verificar si el usuario no existe en el equipo
            const error = new Error('El Usuario NO existe en el Proyecto');
            res.status(409).json({ error: error.message}); // 409 para un conflicto
            return;
        };
        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== id.toString()); // Eliminar el id del usuario
        await req.project.save(); // Guardar los cambios en el proyecto
        res.send('Usuario eliminado correctamente');
    };
};