import Image from 'next/image';
import styles from './Header.module.css';
import logo from '../../../public/logo.svg';

function Header() {
	return (
    <header className={styles.header}>
      <Image className={styles.logo} src={logo} alt={'Armageddon 2023'} />
      <p className={styles.desription}>
        ООО “Команда им. Б. Уиллиса”.
        <br />
        Взрываем астероиды с 1998 года.
      </p>
    </header>
  );
}

export default Header