import { DataSource, In, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { User } from 'src/auth/user.entity';
import { Property } from '../entities';
import { Facility } from '../entities/facility.entity';
import { NotFoundException } from '@nestjs/common';
import { GetPropertiesFilterDto } from '../dto';
import { SortType } from '../enum';

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

  private applyFilters(
    query: SelectQueryBuilder<Property>,
    filterDto: GetPropertiesFilterDto,
  ) {
    const { city, state, propertyType, search } = filterDto;

    if (city) {
      query.andWhere('city.id = :city', { city });
    }

    if (state) {
      query.andWhere('state.id = :state', { state });
    }

    if (propertyType) {
      query.andWhere('property.propertyType = :propertyType', { propertyType });
    }

    if (search) {
      query.andWhere(
        '(property.name LIKE :search OR property.description LIKE :search OR property.address LIKE :search OR city.name LIKE :search OR state.name LIKE :search)',
        { search: `%${search}%` },
      );
    }
  }

  private applySorting(query: SelectQueryBuilder<Property>, sort?: SortType) {
    switch (sort) {
      case SortType.NEWEST:
        query.orderBy('property.createdAt', 'DESC');
        break;
      case SortType.OLDEST:
        query.orderBy('property.createdAt', 'ASC');
        break;
      case SortType.PRICE_ASC:
        query.orderBy('property.price', 'ASC');
        break;
      case SortType.PRICE_DESC:
        query.orderBy('property.price', 'DESC');
        break;
      default:
        query.orderBy('property.createdAt', 'DESC'); // Default to newest
    }
  }

  async getProperties(user: User, filterDto: GetPropertiesFilterDto) {
    const query = this.createQueryBuilder('property')
      .leftJoin('property.state', 'state')
      .addSelect(['property', 'state.name'])
      .leftJoin('property.city', 'city')
      .addSelect(['property', 'city.name'])
      .leftJoin('property.user', 'user')
      .addSelect(['property', 'user.name', 'user.lastname', 'user.id'])
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoin('property.likedBy', 'likedBy')
      .addSelect(['property', 'likedBy.id'])
      .leftJoin('property.media', 'media')
      .addSelect(['media.fileUrl']);

    // Apply filters
    this.applyFilters(query, filterDto);
    this.applySorting(query, filterDto.sort);

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

  async toggleFavorite(id: string, user: User) {
    const property = await this.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.likedBy.some((likedUser) => likedUser.id === user.id)) {
      property.likedBy = property.likedBy.filter((likedUser) => {
        return likedUser.id !== user.id;
      });
    } else {
      property.likedBy.push(user);
    }

    await this.save(property);

    return {
      message: 'Favorite status updated successfully',
    };
  }
}
