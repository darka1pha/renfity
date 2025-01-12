import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';

@Injectable()
export class CitiesService {
  constructor(private citiesRepository: CitiesRepository) {}

  async getAll() {
    return await this.citiesRepository.getAll();
  }

  async getStateCities(id: number) {
    return await this.citiesRepository.getStateCities(id);
  }

  async getCityById(id: number) {
    return await this.citiesRepository.getCityById(id);
  }
}
