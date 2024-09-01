import { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    fullName: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
