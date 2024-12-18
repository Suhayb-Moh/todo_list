import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as dotenv from 'dotenv';

dotenv.config(); // Explicitly load .env
console.log('Loaded ENV:', process.env.JWT_SECRET);

async function bootstrap() {
  // Create Winston logger instance
  const winstonLogger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      }),
      new winston.transports.File({
        level: 'error',
        filename: 'error.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      }),
    ],
  });

  console.log('Starting server...');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
