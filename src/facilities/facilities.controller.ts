import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { AdminGuard } from 'src/auth/guards';
import { FacilitiesService } from './facilities.service';

@Controller()
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get('facilities')
  getFacilities() {
    return this.facilitiesService.getFacilities();
  }

  @Post('facilities')
  @UseGuards(AuthGuard(), AdminGuard)
  createFacility(@Body() body: CreateFacilityDto) {
    return this.facilitiesService.createFacility(body);
  }

  @Get('/facilities/:propertyId')
  getPropertyFacilities(@Param('propertyId') propertyId: string) {
    return this.facilitiesService.getPropertyFacilities(propertyId);
  }
}
