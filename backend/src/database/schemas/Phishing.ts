import { Schema, Document } from 'mongoose';

export interface PhishingInterface extends Document {
    employeeEmail: string;
    emailContent: string;
    phishingStatus: boolean;
}

export const PhishingSchema = new Schema({
    employeeEmail: { type: String, required: true },
    emailContent: { type: String, required: true },
    phishingStatus: { type: Boolean, default: false },
});
