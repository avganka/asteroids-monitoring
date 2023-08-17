import Image from 'next/image';
import styles from './Asteroid.module.css';
import {NearEarthObject} from '@/types';
import {formatDistance} from '@/utils';
import bigAsteroid from '../../../public/big-asteroid.png';
import smallAsteroid from '../../../public/small-asteroid.png';
import dangerIcon from '../../../public/danger.svg';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';

const SMALL_OR_BIG_LIMIT = 100;

function Asteroid({asteroid}: {asteroid: NearEarthObject}) {
  return (
    <li key={asteroid.id} className={styles.asteroidsItem}>
      <article>
        <p className={styles.asteroidDate}>
          {format(
            new Date(asteroid.close_approach_data[0].close_approach_date_full),
            'dd MMMM yyyy',
            {
              locale: ru,
            }
          )}
        </p>
        <div className={styles.asteroidInfo}>
          <p className={styles.asteroidDistance}>
            {true === true
              ? `${formatDistance(asteroid.close_approach_data[0].miss_distance.kilometers)} км`
              : `${formatDistance(asteroid.close_approach_data[0].miss_distance.lunar)} л.о.`}
          </p>
          {asteroid.estimated_diameter.meters.estimated_diameter_max > SMALL_OR_BIG_LIMIT ? (
            <Image
              className={styles.asteroidIcon}
              src={bigAsteroid}
              alt={'Большой астероид'}
              aria-hidden={true}
            />
          ) : (
            <Image
              className={styles.asteroidIcon}
              src={smallAsteroid}
              alt={'Маленький астероид'}
              aria-hidden={true}
            />
          )}

          <div>
            <h2 className={styles.asteroidName}>
              {asteroid.name.match(/\(([^)]+)\)/g)![0].slice(1, -1)}
            </h2>
            <span>Ø {Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)} м</span>
          </div>
        </div>
        <div className={styles.btns}>
          <button className={styles.asteroidBtn}>Заказать</button>
          {asteroid.is_potentially_hazardous_asteroid && (
            <div className={styles.danger}>
              <Image
                className={styles.dangerIcon}
                src={dangerIcon}
                alt={'Опасно'}
                aria-hidden={true}
              />
              <span>Опасен</span>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

export default Asteroid;
