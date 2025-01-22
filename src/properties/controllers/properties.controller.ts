import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PropertiesService } from '../services/properties.service';
import { CreatePropertyDto, GetPropertiesFilterDto } from '../dto';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}
  @UseGuards(AuthGuard())
  @Post()
  createProperty(@Body() body: CreatePropertyDto, @GetUser() user: User) {
    return this.propertiesService.createProperty(body, user);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteProperty(@Param('id') id: string) {
    return this.propertiesService.deleteProperty(id);
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
  async toggleFavorite(@Param('id') id: string, @GetUser() user: User) {
    return this.propertiesService.toggleFavorite(id, user);
  }
}
