import mongoose,{ Schema, Document, Types } from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed',
} as const;

export type taskStatus = typeof taskStatus[keyof typeof taskStatus]; // Solo seleccionar los valores de la constante taskStatus

// Definir la interface para TypeScript
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId; // Referencia a otro documento
    status: taskStatus;
    completedBy: {
        user: Types.ObjectId;
        status: taskStatus;
    }[]; // Array de objetos
    notes: Types.ObjectId[]; // Arreglo de notas
};

// Definir el Schema para Mongoose
export const TaskSchema: Schema = new Schema({
    name : {
        type: String,
        trim: true, // Eliminar espacios en blanco
        required: true
    },
    description : {
        type: String,
        trim: true, // Eliminar espacios en blanco
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // Validar que el valor sea uno de los permitidos
        default: taskStatus.PENDING,
    },
    completedBy: [
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus), // Validar que el valor sea uno de los permitidos
                default: taskStatus.PENDING,
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note'
        },
    ],
}, {timestamps: true});

// Definir el Modelo para Mongoose
const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;