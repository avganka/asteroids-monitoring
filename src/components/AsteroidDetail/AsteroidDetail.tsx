'use client';
import styles from './AsteroidDetail.module.css';
import {DistanceContext} from '@/context/DistanceContext';
import {NearEarthObject} from '@/types';
import {formatDistance, formatWordDeclension} from '@/utils';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import {useContext} from 'react';
import speedIcon from '../../../public/asteroid.svg';
import distanceIcon from '../../../public/distance.svg';
import OrbitIcon from '../../../public/orbit.svg';

function AsteroidDetail({asteroid}: {asteroid: NearEarthObject}) {
  const units = useContext(DistanceContext);

  const sortedApproaches = asteroid.close_approach_data.sort((a, b) => {
    const dateA = new Date(a.close_approach_date);
    const dateB = new Date(b.close_approach_date);

    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  const lunarDistanceLocale =
    formatWordDeclension(parseInt(asteroid.close_approach_data[0].miss_distance.lunar), [
      'лунная',
      'лунных',
      'лунных',
    ]) +
    ' ' +
    formatWordDeclension(parseInt(asteroid.close_approach_data[0].miss_distance.lunar), [
      'орбита',
      'орбиты',
      'орбит',
    ]);

  return (
    <ul className={styles.approachesList}>
      {sortedApproaches.map((approach) => (
        <li key={approach.close_approach_date_full}>
          <article className={styles.approach}>
            <h2>
              {format(new Date(approach.close_approach_date), 'dd MMMM yyyy', {
                locale: ru,
              })}
            </h2>
            <div className={styles.asterodFeatures}>
              <div className={styles.asteroidFeature}>
                <svg className={styles.asteroidIcon} aria-hidden={true} width='50' height='50'>
                  <use xlinkHref={`${speedIcon.src}#asteroid`}></use>
                </svg>
                Скорость
                <span className={styles.asteroidValue}>
                  {formatDistance(approach.relative_velocity.kilometers_per_second)} км/с
                </span>
              </div>
              <div className={styles.asteroidFeature}>
                <svg className={styles.asteroidIcon} aria-hidden={true} width='50' height='50'>
                  <use xlinkHref={`${distanceIcon.src}#distance`}></use>
                </svg>
                Расстояние до земли
                <span className={styles.asteroidValue}>
                  {units === 'kilometers'
                    ? `${formatDistance(approach.miss_distance.kilometers)} км`
                    : `${formatDistance(approach.miss_distance.lunar)} ${lunarDistanceLocale}`}
                </span>
              </div>
              <div className={styles.asteroidFeature}>
                <svg className={styles.asteroidIcon} aria-hidden={true} width='50' height='50'>
                  <use xlinkHref={`${OrbitIcon.src}#orbit`}></use>
                </svg>
                Орбита
                <span className={styles.asteroidValue}>{approach.orbiting_body}</span>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default AsteroidDetail;
