import mongoose,{ Schema, Document } from "mongoose";

// Definir la interface para TypeScript
export interface ITask extends Document {
    name: string;
    description: string;
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
    }
});

// Definir el Modelo para Mongoose
const Task = mongoose.model<ITask>('Taks', TaskSchema);
export default Task;