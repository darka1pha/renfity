import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto, GetPropertiesFilterDto } from './dto';
import { User } from 'src/user/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  createProperty(
    @Body() body: CreatePropertyDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    return this.propertiesService.createProperty(body, user, res);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteProperty(@Param('id') id: string, @GetUser() user: User) {
    return this.propertiesService.deleteProperty(id, user);
  }

  @Get()
  getProperties(
    @GetUser() user: User,
    @Query() filterDto: GetPropertiesFilterDto,
  ) {
    return this.propertiesService.getProperties(user, filterDto);
  }

  @Get(':id')
  getPropertyById(@Param('id') id: string, @GetUser() user: User) {
    return this.propertiesService.getPropertyById(id, user);
  }

  @UseGuards(AuthGuard())
  @Post(':id/favorites')
  @ApiBearerAuth()
  async toggleFavorite(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    return this.propertiesService.toggleFavorite(id, user, res);
  }

  @UseGuards(AuthGuard())
  @Post(':id/status')
  togglePropertyStatus(@Param('id') id: string, @GetUser() user: User) {
    return this.propertiesService.togglePropertyStatus(id, user);
  }
}
