import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors';

const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await app.listen(process.env.PORT ?? 3001);

  console.log(`APP IS RUNNING ON PORT ${await app.getUrl()}/api`);
}
bootstrap();
