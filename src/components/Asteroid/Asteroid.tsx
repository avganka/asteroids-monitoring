'use client';
import Image from 'next/image';
import styles from './Asteroid.module.css';
import {NearEarthObject} from '@/types';
import {formatAsteroidName, formatDistance, formatWordDeclension} from '@/utils';
import bigAsteroid from '../../../public/big-asteroid.png';
import smallAsteroid from '../../../public/small-asteroid.png';
import dangerIcon from '../../../public/danger.svg';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import {useContext, useState} from 'react';
import {CartContext, CartDispatchContext} from '@/context/CartContext';
import {DistanceContext} from '@/context/DistanceContext';
import Link from 'next/link';
import Button from '../Button/Button';

import arrowIcon from '../../../public/arrow.svg';

interface AsteroidProps {
  asteroid: NearEarthObject;
  hideOrderBtn?: boolean;
}

const SMALL_OR_BIG_LIMIT = 100;

function Asteroid({asteroid, hideOrderBtn = false}: AsteroidProps) {
  const [isInCart, setInCart] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const cart = useContext(CartContext);
  const units = useContext(DistanceContext);

  const onOrderAsteroidClick = () => {
    if (cart.find((item) => item.id === asteroid.id)) {
      dispatch((prev) => [...prev.filter((item) => item.id !== asteroid.id)]);
    } else {
      dispatch((prev) => [...prev, asteroid]);
    }

    setInCart((prev) => !prev);
  };

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
    <li className={styles.asteroidsItem}>
      <article className={styles.asteroid}>
        <p className={styles.asteroidDate}>
          {format(new Date(asteroid.close_approach_data[0].close_approach_date), 'dd MMMM yyyy', {
            locale: ru,
          })}
        </p>

        <div className={styles.asteroidInfo}>
          <div className={styles.distance}>
            <p className={styles.asteroidDistance}>
              {units === 'kilometers'
                ? `${formatDistance(asteroid.close_approach_data[0].miss_distance.kilometers)} км`
                : `${formatDistance(
                    asteroid.close_approach_data[0].miss_distance.lunar
                  )} ${lunarDistanceLocale}`}
            </p>
            <Image src={arrowIcon} alt={'Стрелка'} className={styles.asteroidDistanceIcon} aria-hidden={'true'}/>
          </div>
          <Link className={styles.asteroidLink} href={`/${asteroid.id}`}>
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
          </Link>
          <div>
            <Link className={styles.asteroidLink} href={`/${asteroid.id}`}>
              <h2 className={styles.asteroidName}>{formatAsteroidName(asteroid.name)}</h2>
            </Link>
            <span>Ø {Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)} м</span>
          </div>
        </div>
        <div className={styles.btns}>
          {!hideOrderBtn &&
            (isInCart ? (
              <Button className={styles.inCart} onClick={onOrderAsteroidClick}>
                В корзине
              </Button>
            ) : (
              <Button onClick={onOrderAsteroidClick}>Заказать</Button>
            ))}
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
