import { Body, Controller, Post } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private advertisementsService: AdvertisementsService) {}

  @Post()
  createAdvertisement(@Body() body: CreateAdvertisementDto) {
    return this.advertisementsService.createAdvertisement(body);
  }
}
