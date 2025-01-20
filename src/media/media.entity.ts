import { Property } from 'src/properties/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityType } from './entity.type.enum';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fileUrl: string; // URL to the media file (image, video, etc.)

  @Column({ type: 'varchar', nullable: true })
  fileType: string; // Type of file (image, video, etc.)

  @Column({ type: 'varchar', nullable: true })
  description: string;

  // Polymorphic relation: stores the entity's ID to which this media belongs
  @Column({ type: 'uuid', nullable: true })
  entityId: string;

  // Polymorphic relation: stores the type of entity (e.g., Property, BlogPost)
  @Column({ type: 'enum', enum: EntityType })
  entityType: EntityType;

  // Relationship to Property
  @ManyToOne(() => Property, (property) => property.media, {
    nullable: true,
  })
  @JoinColumn({ name: 'entityId', referencedColumnName: 'id' })
  property: Property;
}
