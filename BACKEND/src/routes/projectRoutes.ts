import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInpoutErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";

const router = Router();

// Llamadas del Controlador

// Crear un nuevo proyecto
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

// Obtener todos los proyectos
router.get('/', ProjectController.getAllProjects);

// Obtener un proyecto por id
router.get('/:id', 
    param('id').isMongoId().withMessage('ID no válido'), // Validación de ID
    ProjectController.getProjectById
);

// Actualizar proyecto
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

// Eliminar proyecto
router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no válido'), // Validación de ID
    ProjectController.deleteProject
);


// Routes para las tareas
router.param('projectId', validateProjectExist); // Validación de ID del proyecto antes de las rutas de tareas

// Crear tarea
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'),
    handleInpoutErrors, // Si pasa la validación pasa al controlador, de lo contrario se de tiene la ejecución en el middleware
    TaskController.createTask
);

// Obtener todas las tareas de un proyecto
router.get('/:projectId/tasks',
    TaskController.getProjectTasks
);

// Obtener una tarea por ID
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), // Validación de ID
    handleInpoutErrors,
    TaskController.getTaskById
);

// Actualizar tarea
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), // Validación de ID
    body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'),
    handleInpoutErrors,
    TaskController.updateTask
);



export default router;