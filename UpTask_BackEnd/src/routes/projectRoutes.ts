import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInpoutErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();

// ROUTES PARA LOS PROYECTOS

// Autenticar todas la rutas
router.use(authenticate);

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


// ROUTES PARA LAS TAREAS

// - MIDDLEWARES
router.param('projectId', projectExist); // Validación de ID del proyecto antes de las rutas de tareas

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


// Validaciones para taskID de cada tarea - MIDDLEWARES
router.param('taskId', taskExist); // Validación de ID de la tarea antes de las rutas de tareas
router.param('taskId', taskBelongsToProject); // Validación de que la tarea pertenece al proyecto actual

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

// Eliminar tarea
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), // Validación de ID
    handleInpoutErrors,
    TaskController.deleteTask
);

// Actualizar estado de la tarea
router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'), // Validación de ID
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInpoutErrors,
    TaskController.updateStatus
);

// RUTAS PARA LOS EQUIPOS

// Obtener todos los equipos de un proyecto
router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
);

// Encontrar usuario
router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('Email no válido'),
    handleInpoutErrors,
    TeamMemberController.findUserByEmail
);

// Agregar un miembro a un equipo
router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID no válido'),
    handleInpoutErrors,
    TeamMemberController.addUserById
);

// Eliminar un miembro de un equipo
router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID no válido'),
    handleInpoutErrors,
    TeamMemberController.removeUserById
);

export default router;