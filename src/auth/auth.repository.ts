import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { extractKeyValue } from 'src/utils/extractKeyValue';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { access } from 'fs';

export class UsersRepository extends Repository<User> {
  constructor(
    dataSource: DataSource,
    private jwtService: JwtService,
  ) {
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
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return {
        success: true,
        message: 'User created successfully',
        accessToken,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.detail.includes('already exists')
      ) {
        const { field, value } = extractKeyValue(error.driverError.detail);
        throw new ConflictException({
          message: `${field} with value ${value} is already exist.`,
        });
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
