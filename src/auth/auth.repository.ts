import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser({
    username,
    password,
    name,
    lastname,
    mobile,
    agency,
    type,
  }: CreateUserDto) {
    // hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hash,
      name,
      lastname,
      mobile,
      agency,
      type,
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
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
