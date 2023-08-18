'use client';
import styles from './AsteroidDetail.module.css';
import {DistanceContext} from '@/context/DistanceContext';
import {NearEarthObject} from '@/types';
import {formatDistance, sortApproaches} from '@/utils';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import React, {useContext} from 'react';

function AsteroidDetail({asteroid}: {asteroid: NearEarthObject}) {
  const units = useContext(DistanceContext);
  const sortedApproaches = sortApproaches(asteroid.close_approach_data);

  return (
    <ul className={styles.approachesList}>
      {sortedApproaches.map((approach) => (
        <li key={approach.close_approach_date_full}>
          <article className={styles.approach}>
            <h2>
              {format(new Date(approach.close_approach_date_full), 'dd MMMM yyyy', {
                locale: ru,
              })}
            </h2>
            <p>
              Скорость:{' '}
              <span className={styles.asteroidValue}>
                {formatDistance(approach.relative_velocity.kilometers_per_second)} км/с
              </span>
            </p>
            <p>
              Расстояние от Земли:{' '}
              <span className={styles.asteroidValue}>
                {units === 'kilometers'
                  ? `${formatDistance(approach.miss_distance.kilometers)} км`
                  : `${formatDistance(approach.miss_distance.lunar)} л.о.`}
              </span>
            </p>
            <p>
              Орбита: <span className={styles.asteroidValue}>{approach.orbiting_body}</span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default AsteroidDetail;
