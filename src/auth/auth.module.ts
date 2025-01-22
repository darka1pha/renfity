import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './auth.repository';
import { DataSource } from 'typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/user/user.entity';

@Module({
  providers: [
    AuthService,
    {
      provide: UsersRepository,
      useFactory: (dataSource) => new UsersRepository(dataSource),
      inject: [DataSource],
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
