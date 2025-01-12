import { DataSource, Repository } from 'typeorm';
import { State } from './states.entity';

export class StatesRepository extends Repository<State> {
  constructor(dataSource: DataSource) {
    super(State, dataSource.manager);
  }
  async getStates() {
    return await this.find();
  }

  async getStateById(id: number) {
    return await this.findOne({ where: { id } });
  }
}
