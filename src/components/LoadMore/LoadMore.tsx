'use client';
import {useInView} from 'react-intersection-observer';
import Spinner from '../Spinner/Spinner';
import styles from './LoadMore.module.css';
import {useEffect, useState} from 'react';
import {NasaApiResponse, NearEarthObject} from '@/types';
import Asteroid from '../Asteroid/Asteroid';
import {getData, getNextDate} from '@/utils';

function LoadMore() {
  const [asteroids, setAsteroid] = useState<NearEarthObject[]>([]);
  const {ref, inView} = useInView();
  const [startDate, setStartDate] = useState(getNextDate(new Date(), 2));

  const loadMoreAsteroids = async () => {
    const data = await getData<NasaApiResponse>(startDate);
    if (data) {
      setAsteroid((prev) => [
				...prev,
				...Object.values(data.near_earth_objects).flat().reverse(),
      ]);
      setStartDate((prev) => getNextDate(prev, 2));
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreAsteroids();
    }
  }, [inView]);

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid key={asteroid.id} asteroid={asteroid} />
      ))}
      <li ref={ref} className={styles.loadMore}>
        <Spinner />
      </li>
    </>
  );
}

export default LoadMore;
