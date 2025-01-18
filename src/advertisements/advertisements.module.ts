import { Module } from '@nestjs/common';
import { AdvertisementsService } from './services/advertisements.service';
import { AdvertisementsController } from './controllers/advertisements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertisementsRepository } from './repositories/advertisements.repository';
import { DataSource } from 'typeorm';
import { CitiesModule } from 'src/cities/cities.module';
import { StatesModule } from 'src/states/states.module';
import { Advertisement } from './entities';
import { Facility } from './entities/facility.entity';
import { FacilitiesService } from './services/facilities.service';
import { FacilitiesController } from './controllers/facilities.controller';
import { FacilitiesRepository } from './repositories/facilities.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement, Facility]),
    AuthModule,
    CitiesModule,
    StatesModule,
  ],
  providers: [
    AdvertisementsService,
    FacilitiesService,
    {
      provide: AdvertisementsRepository,
      useFactory: (dataSource: DataSource) =>
        new AdvertisementsRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: FacilitiesRepository,
      useFactory: (dataSource: DataSource) =>
        new FacilitiesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [AdvertisementsController, FacilitiesController],
  exports: [TypeOrmModule],
})
export class AdvertisementsModule {}
