import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async getFavoriteProperties(user: User) {
    return await this.userRepository.getFavoriteProperties(user);
  }

  async getAppointments(user: User) {
    return await this.userRepository.getUserAppointments(user);
  }

  async getProperties(user: User) {
    return await this.userRepository.getProperties(user);
  }
}
