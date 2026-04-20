import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://173.212.192.65:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-password'],
  });

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 4000}`);
}
bootstrap();


