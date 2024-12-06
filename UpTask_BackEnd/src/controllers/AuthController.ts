import { Request, Response } from "express";
import User from "../models/User";

export class AuthController {

    // CREATE
    static createAccount = async (req: Request, res: Response) => {
        try {
            const user = new User(req.body); // Se crea un nuevo usuario con los datos del body
            await user.save(); // Se guarda el usuario en la base de datos

            res.send('Cuenta creada correctamente, revisa tu email para confirmarla');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };
};