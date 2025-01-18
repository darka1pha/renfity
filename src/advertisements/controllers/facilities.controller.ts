import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacilitiesService } from '../services/facilities.service';
import { CreateFacilityDto } from '../dto/create-facility.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller()
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get('facilities')
  getFacilities() {
    return this.facilitiesService.getFacilities();
  }

  @Post('facilities')
  @UseGuards(AuthGuard())
  @UseGuards(AdminGuard)
  createFacility(@Body() body: CreateFacilityDto) {
    return this.facilitiesService.createFacility(body);
  }

  @Get('advertisements/:id/facilities')
  getAdvertisementFacilities(@Param('id') id: string) {
    return this.facilitiesService.getAdvertisementFacilities(id);
  }
}
