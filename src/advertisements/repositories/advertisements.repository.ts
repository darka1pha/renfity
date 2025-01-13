import { DataSource, In, Repository } from 'typeorm';
import { CreateAdvertisementDto } from '../dto/create-advertisement.dto';
import { User } from 'src/auth/user.entity';
import { Advertisement } from '../entities';
import { Facility } from '../entities/facility.entity';

export class AdvertisementsRepository extends Repository<Advertisement> {
  constructor(dataSource: DataSource) {
    super(Advertisement, dataSource.manager);
  }

  async createAdvertisement(body: CreateAdvertisementDto, user: User) {
    const { facilities, ...rest } = body;
    const resolvedFacilities = await this.manager.find(Facility, {
      where: { id: In(facilities) },
    });

    const advertisement = this.create({
      ...rest,
      user,
      facilities: resolvedFacilities,
    });
    await this.save(advertisement);
    return advertisement;
  }

  async getAdvertisements() {
    const query = this.createQueryBuilder('advertisement')
      .leftJoinAndSelect('advertisement.state', 'state')
      .leftJoinAndSelect('advertisement.city', 'city')
      .leftJoinAndSelect('advertisement.user', 'user')
      .leftJoinAndSelect('advertisement.facilities', 'facilities');

    return await query.getMany();
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
