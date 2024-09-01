import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../database/schemas/User";
import {JwtService} from "./jwt.service";
import {ConfigService} from "@nestjs/config";
import {EmailService} from "../sharedServices/email.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, JwtService, ConfigService, EmailService],
  controllers: [AuthController]
})
export class AuthModule {}
