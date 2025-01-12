import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertisementsRepository } from './advertisements.repository';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { CitiesService } from 'src/city/cities.service';
import { StateService } from 'src/states/states.service';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(AdvertisementsRepository)
    private advertisementsRepository: AdvertisementsRepository,
    private readonly citiesService: CitiesService,
    private readonly stateService: StateService,
  ) {}

  async getAdvertisements() {
    return await this.advertisementsRepository.getAdvertisements();
  }

  async createAdvertisement(body: CreateAdvertisementDto) {
    const { cityId, stateId, ...rest } = body;

    // Fetch and validate city
    const city = await this.citiesService.getCityById(cityId);

    // Fetch and validate state
    const state = await this.stateService.getStateById(stateId);

    return await this.advertisementsRepository.createAdvertisement({
      ...rest,
      city,
      state,
    });
  }
}
