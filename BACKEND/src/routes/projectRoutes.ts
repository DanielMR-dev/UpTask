import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInpoutErrors } from "../middleware/validation";

const router = Router();

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El Nombre del Projecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInpoutErrors, // Si para la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);

export default router;