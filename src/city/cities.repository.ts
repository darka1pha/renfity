import { DataSource, Repository } from 'typeorm';
import { City } from './cities.entity';

export class CitiesRepository extends Repository<City> {
  constructor(dataSource: DataSource) {
    super(City, dataSource.manager);
  }

  async getAll() {
    return this.find();
  }

  async getStateCities(id: number) {
    return this.find({ where: { state: { id } } });
  }

  async getCityById(id: number) {
    return this.findOneBy({ id });
  }
}
