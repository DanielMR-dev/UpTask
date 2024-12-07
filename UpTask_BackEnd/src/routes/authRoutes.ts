import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInpoutErrors } from "../middleware/validation";

const router = Router();

// Crear cuenta
router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El Password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Password no coinciden');
        };
        return true;
    }),
    body('email')
        .isEmail().withMessage('E-mail no válido'), 
    handleInpoutErrors, // Si pasa la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    AuthController.createAccount // Si pasa la validación pasa al controlador para crear la cuenta
);

// Confirmar cuenta
router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInpoutErrors,
    AuthController.confirmAccount
);

// Login
router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no válido'), 
    body('password')
        .notEmpty().withMessage('El Password no puede ir vacio'),
    handleInpoutErrors,
    AuthController.login
);

export default router;