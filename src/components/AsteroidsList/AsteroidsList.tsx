import styles from './AsteroidsList.module.css';
import {NasaApiResponse} from '@/types';
import Asteroid from '../Asteroid/Asteroid';
import {getData, getNextDate} from '@/utils';
import LoadMore from '../LoadMore/LoadMore';

async function AsteroidsList() {
  //const [activeDistance, setACtiveDistance] = useState<'kilometers' | 'lunar'>('kilometers');
  const data = await getData<NasaApiResponse>(getNextDate());

  if (!data) {
    return <h1>Error</h1>;
  }

  return (
    <ul className={styles.asteroidsList}>
      {Object.values(data.near_earth_objects)
        .flatMap((asteroids => asteroids))
        .map((asteroid) => (
          <Asteroid key={asteroid.id} asteroid={asteroid} />
        ))}
      <LoadMore />
    </ul>
  );
}

export default AsteroidsList;


