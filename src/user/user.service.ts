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

  async getProfile(user: User) {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      type: user.type,
      profilePic: user.profilePic,
      agency: user.agency,
      mobile: user.mobile,
    };
  }

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
