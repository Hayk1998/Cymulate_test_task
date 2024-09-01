import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { PhishingModule } from './phishing/phishing.module';
import {JwtService} from "./auth/jwt.service";
import {AuthMiddleware} from "./auth/auth.middleware";
import {EmailService} from "./sharedServices/email.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => {
        const nodeEnv = process.env.NODE_ENV;
        const envFilePath = nodeEnv ? `.env.${nodeEnv}`: '.env';
        dotenv.config({ path: envFilePath });
        return {};
      }],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log(`Connecting to MongoDB at ${uri}`);
          return {
            uri: configService.get<string>('MONGODB_URI'),
          }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    PhishingModule,
  ],
  providers: [JwtService, EmailService],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes('phishing'); // Apply middleware to specific routes or globally
  }
}
