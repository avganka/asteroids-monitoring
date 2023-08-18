import {fetchAsteroid} from '@/api';
import styles from './page.module.css';
import AsteroidDetail from '@/components/AsteroidDetail/AsteroidDetail';
import Heading from '@/components/Heading/Heading';
import {NearEarthObject} from '@/types';
import UnitsSwitcher from '@/components/UnitsSwitcher/UnitsSwitcher';
import {formatAsteroidName} from '@/utils';

async function AsteroidPage({params}: {params: {asteroidId: string}}) {
  const data = await fetchAsteroid<NearEarthObject>(params.asteroidId);

  return (
    <>
      <Heading>
        Список всех сближений астероида{' '}
        {data && <span className={styles.asteroidName}>{formatAsteroidName(data.name)}</span>}
      </Heading>
      <UnitsSwitcher />
      {data && <AsteroidDetail asteroid={data} />}
    </>
  );
}

export default AsteroidPage;
