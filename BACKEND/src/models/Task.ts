import mongoose,{ Schema, Document, Types } from "mongoose";

// Definir la interface para TypeScript
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId; // Referencia a otro documento
};

// Definir el Schema para Mongoose
export const TaskSchema: Schema = new Schema({
    name : {
        type: String,
        trim: true,
        required: true
    },
    description : {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true});

// Definir el Modelo para Mongoose
const Task = mongoose.model<ITask>('Taks', TaskSchema);
export default Task;