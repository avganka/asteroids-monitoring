import styles from './AsteroidsList.module.css';
import {NasaApiResponse, NearEarthObject} from '@/types';
import Asteroid from '../Asteroid/Asteroid';
import {getNextDate} from '@/utils';
import {fetchAsteroidsList} from '@/api';
import {ReactNode} from 'react';

interface AsteroidListProps {
  asteroids?: NearEarthObject[];
  children?: ReactNode;
  hideOrderBtn?: boolean;
}

async function AsteroidsList({asteroids, children, hideOrderBtn}: AsteroidListProps) {
  let asteroidsList = asteroids ? asteroids : [];

  if (asteroids === undefined) {
    const data = await fetchAsteroidsList<NasaApiResponse>(getNextDate());

    asteroidsList = Object.values(data!.near_earth_objects).flatMap((asteroids) => asteroids);
  }

  return (
    <ul className={styles.asteroidsList}>
      {asteroidsList.map((asteroid) => (
        <Asteroid key={asteroid.id} asteroid={asteroid} hideOrderBtn={hideOrderBtn} />
      ))}
      {children}
    </ul>
  );
}
export default AsteroidsList;
