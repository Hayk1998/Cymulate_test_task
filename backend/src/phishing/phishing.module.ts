import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { PhishingSchema } from "../database/schemas/Phishing";
import {EmailService} from "../sharedServices/email.service";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Phishing', schema: PhishingSchema }])],
  providers: [PhishingService, EmailService, ConfigService],
  controllers: [PhishingController],
})
export class PhishingModule {}
