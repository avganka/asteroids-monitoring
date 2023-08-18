//'use client';
import Image from 'next/image';
import styles from './page.module.css';
import planet from '../../public/planet.png';
import Cart from '@/components/CartWidget/Cart';
import Header from '@/components/Header/Header';
import AsteroidsList from '@/components/AsteroidsList/AsteroidsList';
import {CartProvider} from '@/context/CartContext';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.planetWrapper}>
          <Image className={styles.planet} src={planet} alt={''} />
        </div>
        <CartProvider>
          <div className={styles.mainContent}>
            <h1 className={styles.mainTitle}>Ближайшие подлёты астероидов</h1>
            <div className={styles.distanceUnits}>
              <button className={styles.distanceBtn}>в километрах</button>
              <button className={styles.distanceBtn}>в лунных орбитах</button>
            </div>
            <AsteroidsList />
          </div>
          <Cart />
        </CartProvider>
      </main>
    </>
  );
}
