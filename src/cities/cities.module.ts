import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './cities.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CitiesRepository } from './cities.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City]), AuthModule],
  providers: [
    CitiesService,
    {
      provide: CitiesRepository,
      useFactory: (dataSource: DataSource) => new CitiesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [CitiesController],
  exports: [TypeOrmModule, CitiesService],
})
export class CitiesModule {}
