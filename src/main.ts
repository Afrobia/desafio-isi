import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const APP_PORT = configService.get<number>('PORT', 3010, { infer: true });

  app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }))


  await app.listen(APP_PORT, () => {
    console.log(`Application is running on: http://localhost:${APP_PORT}`)    ;
  });
}
bootstrap();
