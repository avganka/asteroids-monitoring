import styles from './AsteroidsList.module.css';
import {NasaApiResponse, NearEarthObject} from '@/types';
import Asteroid from '../Asteroid/Asteroid';
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
    const data = await fetchAsteroidsList<NasaApiResponse>(new Date());

    asteroidsList = Object.values(data!.near_earth_objects).flatMap((asteroids) => asteroids);
  }

  asteroidsList.sort((a, b) => {
    const dateA = new Date(a.close_approach_data[0].close_approach_date);
    const dateB = new Date(b.close_approach_data[0].close_approach_date);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

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
