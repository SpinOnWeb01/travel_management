// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm'; // Import DataSource
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config(); // Load the .env file

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unallowed fields
      forbidNonWhitelisted: true, // Error if extra fields
      forbidUnknownValues: true, // Reject completely empty objects
    }),
  );

  // Get the instance of DataSource and initialize it
  // const dataSource = app.get(DataSource);  // Retrieve the DataSource instance
  // await dataSource.initialize();  // Initialize the data source
  app.enableCors({
    origin: '*', // Allow all or specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // ✅ Set Global Prefix "/api"
  app.setGlobalPrefix(process.env.API_BASE_URL || 'api');

  await app.listen(parseInt(process.env.PORT || '5000', 10));
}

bootstrap();
