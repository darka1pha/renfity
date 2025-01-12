import { CitiesService } from './../city/cities.service';
import { DataSource, Repository } from 'typeorm';
import { Advertisement } from './advertisement.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvertisementsRepository extends Repository<Advertisement> {
  constructor(dataSource: DataSource) {
    super(Advertisement, dataSource.manager);
  }

  async createAdvertisement(body: CreateAdvertisementDto) {
    const advertisement = this.create(body);
    await this.save(advertisement);
    return advertisement;
  }

  async getAdvertisements() {
    // Get all advertisements
  }

  async getAdvertisementById() {
    // Get an advertisement by ID
  }

  async updateAdvertisement() {
    // Update an advertisement
  }

  async deleteAdvertisement() {
    // Delete an advertisement
  }
}
