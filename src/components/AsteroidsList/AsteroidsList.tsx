import styles from './AsteroidsList.module.css';
import {NasaApiResponse} from '@/types';
import Asteroid from '../Asteroid/Asteroid';
import {getData} from '@/utils';

const URL = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${process.env.NASA_API_TOKEN}`;

async function AsteroidsList() {
  const data = await getData<NasaApiResponse>(URL);

  if (!data) {
    return <h1>Error</h1>;
  }
  //const [activeDistance, setACtiveDistance] = useState<'kilometers' | 'lunar'>('kilometers');
  return (
    <ul className={styles.asteroidsList}>
      {Object.values(data.near_earth_objects || {}).flatMap((asteroids) =>
        asteroids.map((asteroid) => <Asteroid key={asteroid.id} asteroid={asteroid} />)
      )}
    </ul>
  );
}

export default AsteroidsList;
