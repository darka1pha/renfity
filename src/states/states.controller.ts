import { Controller, Get } from '@nestjs/common';
import { StateService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private stateService: StateService) {}

  @Get()
  getStates() {
    return this.stateService.getStates();
  }
}
