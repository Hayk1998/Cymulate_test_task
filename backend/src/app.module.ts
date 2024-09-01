import {Module, OnModuleInit} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Mongoose } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => {
        const nodeEnv = process.env.NODE_ENV || 'development';
        const envFilePath = `.env.${nodeEnv}`;
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
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly mongoose: Mongoose) {}

  onModuleInit() {
    this.mongoose.connection.on('connected', () => {
      console.log('Successfully connected to MongoDB');
    });

    this.mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error);
    });

    this.mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }
}
