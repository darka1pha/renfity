import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) {}

  async uploadMedia(id: string, file: Express.Multer.File[], user: User) {
    return await this.mediaRepository.uploadMedia(id, file, user);
  }
}
