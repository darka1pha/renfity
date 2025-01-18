import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertisementsRepository } from '../repositories/advertisements.repository';
import { CreateAdvertisementDto } from '../dto/create-advertisement.dto';
import { CitiesService } from 'src/cities/cities.service';
import { StateService } from 'src/states/states.service';
import { User } from 'src/auth/user.entity';

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

  async createAdvertisement(body: CreateAdvertisementDto, user: User) {
    const { cityId, stateId, ...rest } = body;

    const city = await this.citiesService.getCityById(cityId);

    const state = await this.stateService.getStateById(stateId);

    // const facilities =

    return await this.advertisementsRepository.createAdvertisement(
      {
        ...rest,
        city,
        state,
      },
      user,
    );
  }
}
