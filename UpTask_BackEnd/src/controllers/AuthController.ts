import { Request, Response } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {

    // CREATE
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password } = req.body; // Se obtiene el password del body
            const user = new User(req.body); // Se crea un nuevo usuario con los datos del body

            // Hashear Password
            user.password = await hashPassword(password); // Se usa la función hashPassword para hashear el password

            await user.save(); // Se guarda el usuario en la base de datos

            res.send('Cuenta creada correctamente, revisa tu email para confirmarla');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };
};