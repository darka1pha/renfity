import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './auth.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { ILike } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp({
    password,
    lastname,
    name,
    username,
    mobile,
    agency,
    type,
  }: CreateUserDto) {
    return this.usersRepository.createUser({
      password,
      name,
      lastname,
      username,
      mobile,
      agency,
      type,
    });
  }

  async signin(signinDto: SigninDto) {
    const { username, password } = signinDto;
    const user = await this.usersRepository.findOne({
      where: {
        username: ILike(username),
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return {
        success: true,
        message: 'User signed in successfully',
        accessToken,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
