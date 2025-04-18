import { DataSource, Repository } from 'typeorm';
import { Media } from './media.entity';
import { Property } from 'src/properties/entities';
import { EntityType } from './entity.type.enum';
import { FILE_UPLOAD_DIRECTORY } from 'src/constants';
import { User } from 'src/user/user.entity';

export class MediaRepository extends Repository<Media> {
  private property: Repository<Property>;
  constructor(dataSource: DataSource) {
    super(Media, dataSource.manager);
    this.property = dataSource.getRepository(Property);
  }

  async uploadMedia(id: string, files: Express.Multer.File[], user: User) {
    const property = await this.property.findOneBy({ id });
    if (!property) {
      throw new Error(`Property with ID ${id} not found.`);
    }
    const mediaEntities = files.map((file) => {
      const relativePath = `uploads/${file.filename}`;
      return this.create({
        description: file.originalname,
        fileUrl: relativePath,
        fileType: file.mimetype,
        property,
        entityId: id,
        entityType: EntityType.PROPERTY,
      });
    });

    try {
      await this.save(mediaEntities); // Batch save for better performance
      return { message: 'Media uploaded successfully' };
    } catch (error) {
      console.error('Error uploading media:', error);
      throw new Error('Failed to upload media.');
    }
  }
}
