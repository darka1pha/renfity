import { Module } from '@nestjs/common';
import { StateService } from './states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './states.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StatesRepository } from './states.repository';
import { DataSource } from 'typeorm';
import { StatesController } from './states.controller';

@Module({
  imports: [TypeOrmModule.forFeature([State]), AuthModule],
  providers: [
    StateService,
    {
      provide: StatesRepository,
      useFactory: (dataSource: DataSource) => new StatesRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [StatesController],
  exports: [TypeOrmModule, StateService],
})
export class StatesModule {}
