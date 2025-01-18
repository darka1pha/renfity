import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdvertisementsService } from '../services/advertisements.service';
import { CreateAdvertisementDto } from '../dto/create-advertisement.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private advertisementsService: AdvertisementsService) {}
  @UseGuards(AuthGuard())
  @Post()
  createAdvertisement(
    @Body() body: CreateAdvertisementDto,
    @GetUser() user: User,
  ) {
    return this.advertisementsService.createAdvertisement(body, user);
  }

  @Get()
  getAdvertisements() {
    return this.advertisementsService.getAdvertisements();
  }
}
