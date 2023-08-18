import styles from './PlanetDecoration.module.css';
import Image from 'next/image';
import planet from '../../../public/planet.png';

function PlanetDecoration() {
	return (
    <div className={styles.planetWrapper}>
      <Image className={styles.planet} src={planet} alt={'Планета Земля'} aria-hidden={true}/>
    </div>
  );
}

export default PlanetDecoration