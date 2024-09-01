import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserInterface} from "../database/schemas/User";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<UserInterface>,
    ) {}

    async createUser(email: string, fullName: string, password: string): Promise<UserInterface> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, fullName, password: hashedPassword });
        return newUser.save();
    }

    async findUserByEmail(email: string): Promise<UserInterface | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async validatePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(providedPassword, storedPassword);
    }
}
