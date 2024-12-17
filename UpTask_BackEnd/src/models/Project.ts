import mongoose,{ Schema, Document, PopulatedDoc, Types } from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

// Definir la interface para TypeScript
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[]; // Un projecto con múltiples tareas
    manager: PopulatedDoc<IUser & Document>; // Solo un manager por proyecto
    team: PopulatedDoc<IUser & Document>[]; // Un equipo con múltiples usuarios
};

// Definir el Schema para Mongoose
const projectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true, // Campo obligatorio
        trim: true // Eliminar espacios en blanco
    },
    clientName: {
        type: String,
        required: true, // Campo obligatorio
        trim: true // Eliminar espacios en blanco
    },
    description: {
        type: String,
        required: true, // Campo obligatorio
        trim: true // Eliminar espacios en blanco
    },
    tasks: [ // Un array de tareas
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager : {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [ // Un array de tareas
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
}, {timestamps: true});

// Middleware
projectSchema.pre('deleteOne', {document: true}, async function() {
    const projectId = this._id; // Obtiene el ID del Proyecto a eliminar
    if(!projectId) return;
    const tasks = await Task.find({ project: projectId }); // Busca tareas asociadas al proyecto
    for(const task of tasks) { // Iterar en cada tarea
        await Note.deleteMany({task: task._id}); // Elimina notas asociadas a cada tarea
    };
    await Task.deleteMany({project: projectId}); // Elimina las Tareas asociadas al Proyecto
});

// Definir el Modelo para Mongoose
const Project = mongoose.model<IProject>('Project', projectSchema); // Se hace referencia el Type via Generics
export default Project;
