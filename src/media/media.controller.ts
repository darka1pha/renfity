import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload/:itemId')
  async uploadMedia(@Param('itemId') propertyId: string) {
    console.log({ propertyId });
  }
}
