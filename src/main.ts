import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import fastifyMultipart from '@fastify/multipart';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';

const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
  );

  await app.listen(process.env.PORT ?? 3001);

  console.log(`APP IS RUNNING ON PORT ${await app.getUrl()}`);
}
bootstrap();
