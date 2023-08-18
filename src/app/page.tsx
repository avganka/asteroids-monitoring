import styles from './page.module.css';
import Cart from '@/components/CartWidget/Cart';
import AsteroidsList from '@/components/AsteroidsList/AsteroidsList';
import {CartProvider} from '@/context/CartContext';
import {DistanceProvider} from '@/context/DistanceContext';
import UnitsSwitcher from '@/components/UnitsSwitcher/UnitsSwitcher';

function Home() {
  return (
    <DistanceProvider>
      <CartProvider>
        <h1 className={styles.mainTitle}>Ближайшие подлёты астероидов</h1>
        <UnitsSwitcher />
        <AsteroidsList />
        <Cart />
      </CartProvider>
    </DistanceProvider>
  );
}

export default Home;
