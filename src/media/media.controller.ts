import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload/:itemId')
  @UseInterceptors()
  async uploadMedia(@Param('itemId') propertyId: string) {
    console.log({ propertyId });
  }
}
