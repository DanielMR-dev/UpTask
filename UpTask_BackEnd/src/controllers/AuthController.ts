import { Request, Response } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";

export class AuthController {

    // CREATE
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body; // Se obtiene el password del body

            // Prevenir usuarios duplicados
            const userExist = await User.findOne({ email }); // Se busca el usuario en la base de datos
            if(userExist) { // Si el usuario existe
                const error = new Error("El usuario ya existe");
                res.status(409).json({error: error.message});
                return;
            };


            // Crea un usuario
            const user = new User(req.body); // Se crea un nuevo usuario con los datos del body

            // Hashear Password
            user.password = await hashPassword(password); // Se usa la función hashPassword para hashear el password

            // Generar el Token
            const token = new Token(); // Se genera una nueva instancia con el Schema de Token
            token.token = generateToken(); // Se genera el token de 6 dígitos
            token.user = user.id; // Se asigna el usuario al que le pertenece el Token

            await Promise.allSettled([user.save(), token.save()]); // Se guardan los datos del usuario y el token en la base de datos

            res.send('Cuenta creada correctamente, revisa tu email para confirmarla');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    };
};