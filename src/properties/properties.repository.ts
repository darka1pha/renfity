import { DataSource, In, Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './entities';
import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { GetPropertiesFilterDto, UpdateStatusDto } from './dto';
import { SortType, PropertyStatus } from './enum';
import { User } from 'src/user/user.entity';
import { Facility } from 'src/facilities/facility.entity';
import { City } from 'src/cities/cities.entity';
import { State } from 'src/states/states.entity';
import { UserType } from 'src/user/enum/user.type.enum';
import { Response } from 'express';
import { getPublicUrl } from 'src/utils/getPublicUrl';

export class PropertiesRepository extends Repository<Property> {
  constructor(dataSource: DataSource) {
    super(Property, dataSource.manager);
  }

  async upadteStatus(id: string, user: User, dto: UpdateStatusDto) {
    const property = await this.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException();
    }

    if (user.id === property.user.id || user.type === UserType.ADMIN) {
      if (
        dto.status === PropertyStatus.ACTIVE &&
        user.type !== UserType.ADMIN
      ) {
        throw new ForbiddenException(
          'You are not authorized to perform this action.',
        );
      }

      property.status = dto.status;
      await this.save(property);

      return {
        message: `Property has been ${property.status} successfully'}`,
      };
    }

    throw new ForbiddenException(
      'You are not authorized to perform this action.',
    );
  }

  async createProperty(body: CreatePropertyDto, user: User, res: Response) {
    const { facilities, cityId, stateId, ...rest } = body;

    const city = await this.manager.findOne(City, { where: { id: cityId } });
    const state = await this.manager.findOne(State, { where: { id: stateId } });

    const resolvedFacilities = await this.manager.find(Facility, {
      where: { id: In(facilities) },
    });

    const property = this.create({
      ...rest,
      user,
      facilities: resolvedFacilities,
      city,
      state,
    });
    await this.save(property);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Property created successfully' });
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
      .leftJoinAndSelect('property.facilities', 'facilities')
      .leftJoin('property.likedBy', 'likedBy')
      .addSelect(['property', 'likedBy.id'])
      .leftJoin('property.media', 'media')
      .addSelect(['media.fileUrl'])
      .where({ status: PropertyStatus.ACTIVE });

    // Apply filters
    this.applyFilters(query, filterDto);
    this.applySorting(query, filterDto.sort);

    const properties = await query.getMany();

    // Add isLiked and map media URLs
    return properties.map((property) => {
      const mediaUrls: string[] =
        property.media?.map((media) => getPublicUrl(media.fileUrl)) || [];

      const isLiked = user
        ? property.likedBy.some((likedUser) => likedUser.id === user.id)
        : null;

      return {
        ...property,
        media: mediaUrls,
        isLiked,
      };
    });
  }

  async getPropertiesById(id: string, user: User) {
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
      .addSelect(['media.fileUrl'])
      .where('property.id = :id', { id });

    // Increment the views count
    await this.createQueryBuilder()
      .update('property')
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .execute();

    const property = await query.getOne();

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // Map media fileUrls to public URLs
    const mediaWithPublicUrls =
      property.media?.map((media) => getPublicUrl(media.fileUrl)) || [];

    // Add the isLiked field dynamically
    return {
      ...property,
      media: mediaWithPublicUrls,
      isLiked: !!user
        ? property.likedBy.some((likedUser) => likedUser.id === user.id)
        : null,
    };
  }

  async updateProperties() {}

  async deleteProperty(id: string, user: User) {
    const property = await this.findOneBy({ id });
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.user.id === user.id || user.type === UserType.ADMIN) {
      const result = await this.delete({ id });
      return { message: 'Property deleted successfully' };
    }

    throw new ForbiddenException(
      'You are not authorized to perform this action.',
    );
  }

  async toggleFavorite(id: string, user: User, res: Response) {
    const property = await this.findOne({
      where: { id },
      relations: ['likedBy'], // Ensure we load the relation
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // Check if the user has already liked the property
    const alreadyLiked = property.likedBy.some(
      (likedUser) => likedUser.id === user.id,
    );

    if (alreadyLiked) {
      // Remove user from likedBy relation
      property.likedBy = property.likedBy.filter(
        (likedUser) => likedUser.id !== user.id,
      );
    } else {
      // Add user to likedBy relation
      property.likedBy.push(user);
    }

    // Save the updated property
    await this.save(property);

    return res.status(HttpStatus.OK).json({
      message: `Property has been ${alreadyLiked ? 'removed from' : 'added to'} favorites`,
    });
  }
}
