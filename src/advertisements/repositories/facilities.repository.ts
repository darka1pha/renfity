import { DataSource, Repository } from 'typeorm';
import { Facility } from '../entities/facility.entity';
import { CreateFacilityDto } from '../dto/create-facility.dto';

export class FacilitiesRepository extends Repository<Facility> {
  constructor(dataSource: DataSource) {
    super(Facility, dataSource.manager);
  }
  async getFacilities() {
    return await this.find();
  }

  async createFacility(body: CreateFacilityDto) {
    const facility = this.create(body);
    await this.save(facility);
    return facility;
  }

  async getFacilityById(id: string) {
    return await this.findOne({ where: { id } });
  }

  async getAdvertisementFacilities(id: string) {
    return await this.find({ where: { advertisements: { id } } });
  }
}
