import { DataSource, Repository } from 'typeorm';
import { Media } from './media.entity';

export class MediaRepository extends Repository<Media> {
  constructor(dataSource: DataSource) {
    super(Media, dataSource.manager);
  }

  async addPropertyMedia(id: string) {
    return await this.createQueryBuilder('media')
      .where('media.propertyId = :id', { id })
      .getMany();
  }
}
