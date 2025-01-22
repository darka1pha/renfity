import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  getCities() {
    return this.citiesService.getAll();
  }

  @Get(':stateId')
  getStateCities(@Param('stateId') stateId: number) {
    return this.citiesService.getStateCities(stateId);
  }
}
