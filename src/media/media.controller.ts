import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_UPLOAD_DIRECTORY } from 'src/constants';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post(':id/property')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
        destination: FILE_UPLOAD_DIRECTORY,
      }),
    }),
  )
  async uploadMedia(
    @UploadedFiles() file: Express.Multer.File[],
    @Param('id') propertyId: string,
  ) {
    return await this.mediaService.uploadMedia(propertyId, file);
  }
}
