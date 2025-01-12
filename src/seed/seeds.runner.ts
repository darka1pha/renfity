import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import seedStatesAndCities from './states.seed';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function runSeeder() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const dataSource = app.get(DataSource);
  await seedStatesAndCities(dataSource);
  await app.close();
}
runSeeder();
