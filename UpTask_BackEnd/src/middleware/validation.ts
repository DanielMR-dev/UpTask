import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInpoutErrors = (req : Request, res : Response, next : NextFunction) : Promise<void> => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }) // 400 Bad Request
        return;
    };
    next(); // llama el siguiente middleware en el stack
    return;
};