import Cart from '@/components/CartWidget/Cart';
import AsteroidsList from '@/components/AsteroidsList/AsteroidsList';
import UnitsSwitcher from '@/components/UnitsSwitcher/UnitsSwitcher';
import LoadMore from '@/components/LoadMore/LoadMore';
import Heading from '@/components/Heading/Heading';

function Home() {
  return (
    <>
      <Heading>Ближайшие подлёты астероидов</Heading>
      <UnitsSwitcher />
      <AsteroidsList>
        <LoadMore/>
      </AsteroidsList>
      <Cart />
    </>
  );
}

export default Home;
