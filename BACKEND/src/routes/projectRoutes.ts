import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInpoutErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";

const router = Router();

// Llamadas del Controlador
router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El Nombre del Projecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInpoutErrors, // Si pasa la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no válido'), // Validación de ID
    ProjectController.getProjectById
);

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no válido'), // Validación de ID
    body('projectName')
        .notEmpty().withMessage('El Nombre del Projecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInpoutErrors, // Si pasa la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    ProjectController.updateProject
);

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no válido'), // Validación de ID
    ProjectController.deleteProject
);

// Routes para las tareas
router.post('/:projectId/tasks',
    validateProjectExist,
    body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'),
    handleInpoutErrors, // Si pasa la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    TaskController.createTask
);

router.get('/:projectId/tasks',
    validateProjectExist,
    TaskController.getProjectTasks
);

export default router;