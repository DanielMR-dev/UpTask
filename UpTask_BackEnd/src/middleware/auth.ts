import { Request, Response, NextFunction } from "express";

// Middleware para revisar que un usuario este autenticado
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization; // Obtener el token del header Authorization
    if(!bearer) {
        const error = new Error("NO Autorizado");
        res.status(401).json({ error: error.message });
        return;
    };

    const [, token] = bearer.split(" "); // Obtener el token usando array destructuring

    next();
};