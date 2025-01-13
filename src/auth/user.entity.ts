import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './user.type.enum';
import { Advertisement } from 'src/advertisements/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  mobile: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  agency: string;

  @Column()
  type: UserType;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.user, {
    eager: true,
  })
  advertisements: Advertisement[];
}
