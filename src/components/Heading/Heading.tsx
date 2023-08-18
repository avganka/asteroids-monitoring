import {PropsWithChildren} from 'react';
import styles from './Heading.module.css';

function Heading({children}: PropsWithChildren) {
  return <h1 className={styles.mainTitle}>{children}</h1>;
}

export default Heading;
