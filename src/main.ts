import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Automatically validates incoming requests based on the DTOs
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not expected in the decorator
    }),
  );

  /**
   * Prefix all routes with 'api'
   * This will make all routes start with '/api'
   */
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
