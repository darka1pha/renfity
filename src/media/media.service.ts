import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) {}

  async uploadMedia(id: string, file: Express.Multer.File[]) {
    return await this.mediaRepository.uploadMedia(id, file);
  }
}
