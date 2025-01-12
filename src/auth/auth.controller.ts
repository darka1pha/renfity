import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('/signin')
  signin(@Body() userDto: SigninDto) {
    return this.authService.signin(userDto);
  }
}
