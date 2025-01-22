import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertiesRepository } from './properties.repository';
import { GetPropertiesFilterDto, CreatePropertyDto } from './dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertiesRepository: PropertiesRepository,
  ) {}

  async getProperties(user: User, filterDto: GetPropertiesFilterDto) {
    return await this.propertiesRepository.getProperties(user, filterDto);
  }

  async createProperty(body: CreatePropertyDto, user: User) {
    return await this.propertiesRepository.createProperty(body, user);
  }

  async deleteProperty(id: string) {
    return await this.propertiesRepository.deleteProperty(id);
  }

  async getPropertyById(id: string, user: User) {
    return await this.propertiesRepository.getPropertiesById(id, user);
  }

  async toggleFavorite(id: string, user: User) {
    return await this.propertiesRepository.toggleFavorite(id, user);
  }
}
