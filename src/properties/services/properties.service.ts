import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertiesRepository } from '../repositories/properties.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { CitiesService } from 'src/cities/cities.service';
import { StateService } from 'src/states/states.service';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertiesRepository: PropertiesRepository,
    private readonly citiesService: CitiesService,
    private readonly stateService: StateService,
  ) {}

  async getProperties(user: User) {
    return await this.propertiesRepository.getProperties(user);
  }

  async createProperty(body: CreatePropertyDto, user: User) {
    const { cityId, stateId, ...rest } = body;

    const city = await this.citiesService.getCityById(cityId);

    const state = await this.stateService.getStateById(stateId);

    return await this.propertiesRepository.createProperty(
      {
        ...rest,
        city,
        state,
      },
      user,
    );
  }

  async deleteProperty(id: string) {
    return await this.propertiesRepository.deleteProperty(id);
  }

  async getPropertyById(id: string, user: User) {
    return await this.propertiesRepository.getPropertiesById(id, user);
  }
}
