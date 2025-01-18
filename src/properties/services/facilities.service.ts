import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilitiesRepository } from '../repositories/facilities.repository';
import { CreateFacilityDto } from '../dto/create-facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilitiesRepository)
    private facilitiesRepository: FacilitiesRepository,
  ) {}

  async createFacility(body: CreateFacilityDto) {
    return await this.facilitiesRepository.createFacility(body);
  }

  async getFacilities() {
    return await this.facilitiesRepository.getFacilities();
  }

  async getPropertyFacilities(id: string) {
    return await this.facilitiesRepository.getPropertyFacilities(id);
  }
}
