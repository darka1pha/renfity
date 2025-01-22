import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
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
}
