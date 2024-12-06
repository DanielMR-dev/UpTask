import mongoose, { Schema, Document } from "mongoose";

// Definir la interface de User
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
};

// Definir el Schema de User
const userSchema: Schema = new Schema({
    email: { 
        type: String, 
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    confirmed : {
        type: Boolean,
        default: false,
    },
});

// Definir el Modelo para Mongoose
const User = mongoose.model<IUser>('User', userSchema);
export default User;
