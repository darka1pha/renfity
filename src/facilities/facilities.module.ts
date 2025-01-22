import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './facility.entity';
import { FacilitiesService } from './facilities.service';
import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';
import { FacilitiesRepository } from './facilities.repository';
import { FacilitiesController } from './facilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Facility]), AuthModule],
  providers: [
    FacilitiesService,
    {
      provide: FacilitiesRepository,
      useFactory: (dataSource: DataSource) =>
        new FacilitiesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [FacilitiesController],
  exports: [TypeOrmModule],
})
export class FacilitiesModule {}
