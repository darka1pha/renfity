import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertiesRepository } from './properties.repository';
import { GetPropertiesFilterDto, CreatePropertyDto } from './dto';
import { User } from 'src/user/user.entity';
import { Response } from 'express';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertiesRepository: PropertiesRepository,
  ) {}

  async getProperties(user: User, filterDto: GetPropertiesFilterDto) {
    return await this.propertiesRepository.getProperties(user, filterDto);
  }

  async createProperty(body: CreatePropertyDto, user: User, res: Response) {
    return await this.propertiesRepository.createProperty(body, user, res);
  }

  async togglePropertyStatus(id: string, user: User) {
    return await this.propertiesRepository.togglePropertyStatus(id, user);
  }

  async deleteProperty(id: string, user: User) {
    return await this.propertiesRepository.deleteProperty(id, user);
  }

  async getPropertyById(id: string, user: User) {
    return await this.propertiesRepository.getPropertiesById(id, user);
  }

  async toggleFavorite(id: string, user: User, res: Response) {
    return await this.propertiesRepository.toggleFavorite(id, user, res);
  }
}
