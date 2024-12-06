import { Request, Response } from "express";

export class AuthController {

    // CREATE
    static createAccount = async (req: Request, res: Response) => {
        res.send('Desde /api/auth');
    };
};