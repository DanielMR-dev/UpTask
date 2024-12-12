import type { Request, Response } from "express";
import User from "../models/User";

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body; // Obtener el email del body de la petición
        const user = await User.findOne({ email }).select('id email name'); // Buscar un usuario con el email proporcionado
        if(!user) {
            const error = new Error('Usuario no encontrado');
            res.status(404).json({ error: error.message}); // 404 para no encontrado
            return;
        };
        res.json(user);
    };
};