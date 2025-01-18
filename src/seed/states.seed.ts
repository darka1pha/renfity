import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { State } from 'src/states/states.entity';
import { City } from 'src/cities/cities.entity';

const seedStatesAndCities = async (dataSource: DataSource) => {
  const stateRepository = dataSource.getRepository(State);
  const cityRepository = dataSource.getRepository(City);

  try {
    // Load JSON file
    const filePath = path.join(__dirname, 'states.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const stateData of data) {
      const state = stateRepository.create({
        name: stateData.name,
        latitude: Number(stateData.latitude),
        longitude: Number(stateData.longitude),
      });

      // Save state and fetch saved state with its ID
      const savedState = await stateRepository.save(state);

      const cityPromises = stateData.cities.map(async (cityData) => {
        const city = cityRepository.create({
          name: cityData.name,
          latitude: Number(cityData.latitude),
          longitude: Number(cityData.longitude),
          state: savedState,
        });

        return cityRepository.save(city); // Save city
      });

      // Wait for all cities to be saved
      await Promise.all(cityPromises);
    }

    console.log('States and cities have been added to the database.');
  } catch (error) {
    console.error('Error seeding states and cities:', error);
  }
};

export default seedStatesAndCities;
