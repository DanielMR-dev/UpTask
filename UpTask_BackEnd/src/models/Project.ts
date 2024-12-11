import mongoose,{ Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

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

// Definir el Modelo para Mongoose
const Project = mongoose.model<IProject>('Project', projectSchema); // Se hace referencia el Type via Generics
export default Project;
