import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingInterface } from "../database/schemas/Phishing";

@Injectable()
export class PhishingService {
    constructor(
        @InjectModel('Phishing') private readonly phishingModel: Model<PhishingInterface>,
    ) {}

    async savePhishingAttempt(employeeEmail: string, emailContent: string): Promise<PhishingInterface> {
        const newPhishingAttempt = new this.phishingModel({
            employeeEmail,
            emailContent,
        });

        return newPhishingAttempt.save();
    }

    async findOneById(_id: string) {
        return this.phishingModel.findById(_id).exec();
    }

    async detectPhishingAttempt(email: string) {
        return this.phishingModel.findOneAndUpdate(
            { employeeEmail: email },
            { phishingStatus: true },
            { new: true } // Return the updated document
        ).exec();
    }

    async getAllAttempts(): Promise<PhishingInterface[]> {
        return this.phishingModel.find();
    }
}
