import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MediaRepository } from './media.repository';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DIRECTORY } from 'src/constants';
import { Property } from 'src/properties/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media, Property]),
    MulterModule.register({ dest: FILE_UPLOAD_DIRECTORY }),
    AuthModule,
  ],
  providers: [
    MediaService,
    {
      provide: MediaRepository,
      useFactory: (dataSource: DataSource) => new MediaRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [MediaController],
})
export class MediaModule {}
