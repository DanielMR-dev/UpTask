import mongoose, { Schema, Document, Types } from "mongoose";

// Definir la interface de User
export interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
};

// Definir el Schema de Token
const tokenSchema = new Schema({
    token: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Types.ObjectId, 
        ref: 'User' 
    },
    expiresAt: {
        type: Date,
        default: () => Date.now(),
        expires: "10m" 
    }
});

// Definir el Modelo para Mongoose
const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;