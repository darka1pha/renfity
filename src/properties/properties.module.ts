import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PropertiesRepository } from './properties.repository';
import { DataSource } from 'typeorm';
import { Property } from './entities';
import { PropertiesService } from './properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), AuthModule],
  providers: [
    PropertiesService,
    {
      provide: PropertiesRepository,
      useFactory: (dataSource: DataSource) =>
        new PropertiesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [PropertiesController],
  exports: [TypeOrmModule],
})
export class PropertiesModule {}
