import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PropertiesService } from '../services/properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}
  @UseGuards(AuthGuard())
  @Post()
  createProperty(@Body() body: CreatePropertyDto, @GetUser() user: User) {
    return this.propertiesService.createProperty(body, user);
  }

  @Get()
  getProperties(@GetUser() user: User) {
    return this.propertiesService.getProperties(user);
  }

  @Get(':id')
  getPropertyById(@Param('id') id: number, @GetUser() user: User) {
    return this.propertiesService.getPropertyById(id, user);
  }
}
