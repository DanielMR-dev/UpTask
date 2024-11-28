import mongoose,{ Schema, Document } from "mongoose";

// Definir la interface para TypeScript
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
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
});

// Definir el Modelo para Mongoose
const Project = mongoose.model<IProject>('Project', projectSchema); // Se hace referencia el Type via Generics
export default Project;
