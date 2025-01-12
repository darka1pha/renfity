import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatesRepository } from './states.repository';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StatesRepository)
    private statesRepository: StatesRepository,
  ) {}

  async getStates() {
    return await this.statesRepository.getStates();
  }

  async getStateById(id: number) {
    return await this.statesRepository.getStateById(id);
  }
}
