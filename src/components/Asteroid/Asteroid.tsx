'use client';
import Image from 'next/image';
import styles from './Asteroid.module.css';
import {CloseApproachData, NearEarthObject} from '@/types';
import {formatAsteroidName, formatDistance} from '@/utils';
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

  const findClosestApproachInTheFuture = (approaches: CloseApproachData[]) => {
    const today = new Date().toISOString().split('T')[0];
    const futureApproaches = approaches.filter((approach) => approach.close_approach_date > today);

    return futureApproaches.reduce((closest, approach) => {
      if (!closest) return approach;
      return parseFloat(approach.miss_distance.kilometers) <
        parseFloat(closest.miss_distance.kilometers)
        ? approach
        : closest;
    }, futureApproaches[0]);
  };

  const onOrderAsteroidClick = () => {
    if (cart.find((item) => item.id === asteroid.id)) {
      dispatch((prev) => [...prev.filter((item) => item.id !== asteroid.id)]);
    } else {
      dispatch((prev) => [...prev, asteroid]);
    }

    setInCart((prev) => !prev);
  };

  const closestApproach = findClosestApproachInTheFuture(asteroid.close_approach_data);

  return (
    <li className={styles.asteroidsItem}>
      <article className={styles.asteroid}>
        <Link className={styles.asteroidLink} href={`/${asteroid.id}`}>
          <p className={styles.asteroidDate}>
            {format(new Date(closestApproach.close_approach_date_full), 'dd MMMM yyyy', {
              locale: ru,
            })}
          </p>
        </Link>
        <div className={styles.asteroidInfo}>
          <p className={styles.asteroidDistance}>
            {units === 'kilometers'
              ? `${formatDistance(closestApproach.miss_distance.kilometers)} км`
              : `${formatDistance(closestApproach.miss_distance.lunar)} л.о.`}
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
            <h2 className={styles.asteroidName}>{formatAsteroidName(asteroid.name)}</h2>
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
