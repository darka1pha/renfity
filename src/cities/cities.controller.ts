import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  getCities() {
    return this.citiesService.getAll();
  }

  @Get(':id')
  getStateCities(@Param('id') id: number) {
    return this.citiesService.getStateCities(id);
  }
}
