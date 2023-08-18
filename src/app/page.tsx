import Image from 'next/image';
import styles from './page.module.css';
import planet from '../../public/planet.png';
import Cart from '@/components/CartWidget/Cart';
import Header from '@/components/Header/Header';
import AsteroidsList from '@/components/AsteroidsList/AsteroidsList';
import {CartProvider} from '@/context/CartContext';
import {DistanceProvider} from '@/context/DistanceContext';
import UnitsSwitcher from '@/components/UnitsSwitcher/UnitsSwitcher';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.planetWrapper}>
          <Image className={styles.planet} src={planet} alt={''} />
        </div>
        <DistanceProvider>
          <CartProvider>
            <div className={styles.mainContent}>
              <h1 className={styles.mainTitle}>Ближайшие подлёты астероидов</h1>
              <UnitsSwitcher/>
              <AsteroidsList />
            </div>
            <Cart />
          </CartProvider>
        </DistanceProvider>
      </main>
    </>
  );
}
