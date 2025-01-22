import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Property } from 'src/properties/entities';

export class UserRepository extends Repository<User> {
  private property: Repository<Property>;
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
    this.property = dataSource.getRepository(Property);
  }

  async getFavoriteProperties(user: User) {
    const result = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.likedProperties', 'likedProperties')
      .leftJoin('likedProperties.media', 'media')
      .addSelect(['media.fileUrl'])
      .where('user.id = :id', { id: user.id })
      .getOne();

    return result?.likedProperties || [];
  }

  async getUserAppointments(user: User) {
    const result = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.appointmentRequests', 'appointmentRequests')
      .where('user.id = :id', { id: user.id })
      .select(['appointmentRequests'])
      .getMany();

    return result;
  }

  async getProperties(user: User) {
    const result = await this.property
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.user', 'user')
      .where('user.id = :id', { id: user.id })
      .select(['property'])
      .leftJoin('property.media', 'media')
      .addSelect(['media.fileUrl'])
      .leftJoin('property.facilities', 'facilities')
      .addSelect(['facilities.title'])
      .leftJoin('property.state', 'state')
      .addSelect(['state.name'])
      .leftJoin('property.city', 'city')
      .addSelect(['city.name'])
      .getMany();

    return result;
  }
}
