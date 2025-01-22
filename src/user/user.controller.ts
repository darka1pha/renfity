import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('favorite-properties')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  getFavoriteProperties(@GetUser() user: User) {
    return this.userService.getFavoriteProperties(user);
  }

  @Get('appointments')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  getAppointments(@GetUser() user: User) {
    return this.userService.getAppointments(user);
  }

  @Get('properties')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  getProperties(@GetUser() user: User) {
    return this.userService.getProperties(user);
  }
}
