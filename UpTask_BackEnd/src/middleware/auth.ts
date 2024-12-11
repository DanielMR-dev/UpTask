import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Agregar el Interface de User al Request
        }
    }
}

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verificar el token

        if(typeof decoded === 'object' && decoded.id) { // Si el token es válido, verificar que el usuario exista
            const user = await User.findById(decoded.id); // Buscar el usuario en la base de datos
            if(user) { // Si el usuario existe
                req.user = user; // Agregar el usuario al request
                next();
            } else {
                res.status(500).json({ error: 'Token No Válido' });
            };
        }
    } catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }
};