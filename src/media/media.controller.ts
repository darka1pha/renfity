import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { FILE_UPLOAD_DIRECTORY } from 'src/constants';

@Controller('media')
@UseGuards(AuthGuard())
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post(':id/property')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: FILE_UPLOAD_DIRECTORY,
        filename: (_, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
          const fileExt = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${fileExt}`);
        },
      }),
    }),
  )
  async uploadMedia(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') propertyId: string,
    @GetUser() user: User,
  ) {
    return await this.mediaService.uploadMedia(propertyId, files, user);
  }
}
