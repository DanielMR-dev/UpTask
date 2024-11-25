import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInpoutErrors = (req : Request, res : Response, next : NextFunction) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // 400 Bad Request
    };
    next(); // llama el siguiente middleware en el stack
};