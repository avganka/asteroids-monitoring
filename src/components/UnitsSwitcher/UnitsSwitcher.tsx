'use client';
import {useContext} from 'react';
import styles from './UnitsSwitcher.module.css';
import {DistanceType, DistanceContext, DistanceDispatchContext} from '@/context/DistanceContext';

function UnitsSwitcher() {
  const units = useContext(DistanceContext);
  const dispatch = useContext(DistanceDispatchContext);

  const onUnitsSwitch = (distanceType: DistanceType) => {
    dispatch(distanceType);
  };

  return (
    <div className={styles.distanceUnits}>
      <button
        className={`${styles.distanceBtn} ${units === 'kilometers' && styles.active}`}
        onClick={() => onUnitsSwitch('kilometers')}
      >
        в километрах
      </button>
      <button
        className={`${styles.distanceBtn} ${units === 'lunar' && styles.active}`}
        onClick={() => onUnitsSwitch('lunar')}
      >
        в лунных орбитах
      </button>
    </div>
  );
}

export default UnitsSwitcher;
