import { Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PropertiesRepository } from './repositories/properties.repository';
import { DataSource } from 'typeorm';
import { CitiesModule } from 'src/cities/cities.module';
import { StatesModule } from 'src/states/states.module';
import { Property } from './entities';
import { Facility } from './entities/facility.entity';
import { FacilitiesService } from './services/facilities.service';
import { FacilitiesController } from './controllers/facilities.controller';
import { FacilitiesRepository } from './repositories/facilities.repository';
import { PropertiesService } from './services/properties.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Facility]),
    AuthModule,
    CitiesModule,
    StatesModule,
  ],
  providers: [
    PropertiesService,
    FacilitiesService,
    {
      provide: PropertiesRepository,
      useFactory: (dataSource: DataSource) =>
        new PropertiesRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: FacilitiesRepository,
      useFactory: (dataSource: DataSource) =>
        new FacilitiesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [PropertiesController, FacilitiesController],
  exports: [TypeOrmModule],
})
export class PropertiesModule {}
