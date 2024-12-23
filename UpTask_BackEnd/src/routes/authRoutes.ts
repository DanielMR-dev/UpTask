import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInpoutErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

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

// Reenviar código de confirmación
router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('E-mail no válido'), 
    handleInpoutErrors,
    AuthController.forgotPassword
);

// Validar Token
router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInpoutErrors,
    AuthController.validateToken
);

// Actualizar Password
router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({min: 8}).withMessage('El Password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Password no coinciden');
        };
        return true;
    }),
    handleInpoutErrors,
    AuthController.updatePasswordWithToken
);

// Obtener el Usuario
router.get('/user',
    authenticate,
    AuthController.user
);

// PERFIL
// Actualizar Perfil
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('E-mail no válido'), 
    handleInpoutErrors,
    AuthController.updateProfile
);

// Actualizar Contraseña actual
router.post('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El Password actual no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El Password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Password no coinciden');
        };
        return true;
    }),
    handleInpoutErrors,
    AuthController.updateCurrentUserPassword
);

// Revisar el Password 
router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El Password no puede ir vacio'),
    handleInpoutErrors,
    AuthController.checkPassword
)
export default router;