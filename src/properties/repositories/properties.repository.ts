import { DataSource, In, Repository } from 'typeorm';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { User } from 'src/auth/user.entity';
import { Property } from '../entities';
import { Facility } from '../entities/facility.entity';

export class PropertiesRepository extends Repository<Property> {
  constructor(dataSource: DataSource) {
    super(Property, dataSource.manager);
  }

  async createProperty(body: CreatePropertyDto, user: User) {
    const { facilities, ...rest } = body;
    const resolvedFacilities = await this.manager.find(Facility, {
      where: { id: In(facilities) },
    });

    const property = this.create({
      ...rest,
      user,
      facilities: resolvedFacilities,
    });
    await this.save(property);
    return property;
  }

  async getProperties(user: User) {
    const query = this.createQueryBuilder('property')
      .leftJoinAndSelect('property.state', 'state')
      .leftJoinAndSelect('property.city', 'city')
      .leftJoinAndSelect('property.user', 'user')
      .leftJoinAndSelect('property.facilities', 'facilities');

    return await query.getMany();
  }

  async getPropertiesById(id: number, user: User) {
    const query = this.createQueryBuilder('property')
      .leftJoinAndSelect('property.state', 'state')
      .leftJoinAndSelect('property.city', 'city')
      .leftJoinAndSelect('property.user', 'user')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .where('property.id = :id', { id });

    // Increment the views count
    await this.createQueryBuilder()
      .update('property')
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .execute();

    return await query.getOne();
  }

  async updateProperties() {}

  async deleteProperties() {}
}
