import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) {}

  async addPropertyMedia(id: string) {
    return await this.mediaRepository.addPropertyMedia(id);
  }
}
