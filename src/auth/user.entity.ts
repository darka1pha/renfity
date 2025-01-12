import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './user.type.enum';

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

  @Column()
  email: string;

  @Column()
  profilePic: string;

  @Column()
  agency: string;

  @Column()
  type: UserType;

  // @OneToMany(() => Task, (task) => task.user, { eager: true })
  // tasks: Task[];
}
