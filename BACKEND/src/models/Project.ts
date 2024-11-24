import mongoose,{ Schema, Document } from "mongoose";

// Definir del Type para TypeScript
export type ProjectType = Document & {
    projectName: string;
    clientName: string;
    description: string;
}

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
const Project = mongoose.model<ProjectType>('Project', projectSchema); // Se hace referencia el Type via Generics
export default Project;
