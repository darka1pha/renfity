import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './city/cities.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12011378',
      database: 'rentify',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdvertisementsModule,
    AuthModule,
    CitiesModule,
    StatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
