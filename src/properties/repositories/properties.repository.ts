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

  async getProperties() {
    const query = this.createQueryBuilder('property')
      .leftJoinAndSelect('property.state', 'state')
      .leftJoinAndSelect('property.city', 'city')
      .leftJoinAndSelect('property.user', 'user')
      .leftJoinAndSelect('property.facilities', 'facilities');

    return await query.getMany();
  }

  async getPropertiesById() {}

  async updateProperties() {}

  async deleteProperties() {}
}
