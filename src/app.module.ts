import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CitiesModule } from './city/cities.module';
import { StatesModule } from './states/states.module';
import { State } from './states/states.entity';
import { City } from './city/cities.entity';

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
      entities: [State, City],
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
