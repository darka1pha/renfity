import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { Advertisement } from './advertisement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertisementsRepository } from './advertisements.repository';
import { DataSource } from 'typeorm';
import { CitiesModule } from 'src/city/cities.module';
import { StatesModule } from 'src/states/states.module';
import { CitiesService } from 'src/city/cities.service';
import { StateService } from 'src/states/states.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement]),
    AuthModule,
    CitiesModule,
    StatesModule,
  ],
  providers: [
    AdvertisementsService,
    {
      provide: AdvertisementsRepository,
      useFactory: (
        dataSource: DataSource,
        citiesService: CitiesService,
        statesService: StateService,
      ) => new AdvertisementsRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [AdvertisementsController],
  exports: [TypeOrmModule],
})
export class AdvertisementsModule {}
