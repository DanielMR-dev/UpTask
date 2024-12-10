import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Middleware para revisar que un usuario este autenticado
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization; // Obtener el token del header Authorization
    if(!bearer) {
        const error = new Error("NO Autorizado");
        res.status(401).json({ error: error.message });
        return;
    };

    const [, token] = bearer.split(" "); // Obtener el token usando array destructuring

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token

        if(typeof decoded === 'object' && decoded.id) { // 
            const user = await User.findById(decoded.id); // Buscar el usuario en la base de datos
        }
    } catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }

    next();
};