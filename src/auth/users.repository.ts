import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser({ username, password, name, lastname }: CreateUserDto) {
    // hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hash,
      name,
      lastname,
    });

    try {
      await this.save(user);
      return {
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
