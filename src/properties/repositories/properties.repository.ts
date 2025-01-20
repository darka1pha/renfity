import { DataSource, In, Not, Repository } from 'typeorm';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { User } from 'src/auth/user.entity';
import { Property } from '../entities';
import { Facility } from '../entities/facility.entity';
import { NotFoundException } from '@nestjs/common';

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
      .leftJoin('property.state', 'state')
      .select(['property', 'state.name'])
      .leftJoin('property.city', 'city')
      .select(['property', 'city.name'])
      .leftJoin('property.user', 'user')
      .select(['property', 'user.name', 'user.lastname', 'user.id'])
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoin('property.likedBy', 'likedBy')
      .select(['property', 'likedBy.id'])
      .leftJoin('property.media', 'media')
      .select(['property', 'media.fileUrl']);
    const properties = await query.getMany();

    // Add isLiked field dynamically
    return properties.map((property) => ({
      ...property,
      isLiked: property.likedBy.some((likedUser) => likedUser.id === user.id),
    }));
  }

  async getPropertiesById(id: string, user: User) {
    const query = this.createQueryBuilder('property')
      .leftJoinAndSelect('property.state', 'state')
      .leftJoinAndSelect('property.city', 'city')
      .leftJoinAndSelect('property.user', 'user')
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoinAndSelect('property.likedBy', 'likedBy')
      .leftJoinAndSelect('property.media', 'media')
      .where('property.id = :id', { id });

    // Increment the views count
    await this.createQueryBuilder()
      .update('property')
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .execute();

    const property = await query.getOne();

    if (!property) {
      throw new NotFoundException('Property not found'); // Optional: handle not found case
    }

    // Add the isLiked field dynamically
    return {
      ...property,
      isLiked: property.likedBy.some((likedUser) => likedUser.id === user.id),
    };
  }

  async updateProperties() {}

  async deleteProperty(id: string) {
    const result = await this.createQueryBuilder('property')
      .delete()
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException('Property not found');
    }

    return { message: 'Property deleted successfully' };
  }
}
