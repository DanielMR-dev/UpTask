import mongoose, { Schema, Document, Types } from "mongoose";

// Definir la interface para TypeScript
export interface INote extends Document {
    content: string;
    createdBy: Types.ObjectId;
    task: Types.ObjectId;
};

// Definir el Schema para Mongoose
const NoteSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: Types.ObjectId,
        ref: 'Task',
        required: true
    }
}, {timestamps: true});

// Definir el Modelo para Mongoose
const Note = mongoose.model<INote>('Note', NoteSchema); 
export default Note;