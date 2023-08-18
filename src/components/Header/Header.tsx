import Image from 'next/image';
import styles from './Header.module.css';
import logo from '../../../public/logo.svg';
import Link from 'next/link';

function Header() {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <Image className={styles.logo} src={logo} alt={'Armageddon 2023'} />
      </Link>
      <p className={styles.desription}>
        ООО “Команда им. Б. Уиллиса”.
        <br />
        Взрываем астероиды с 1998 года.
      </p>
    </header>
  );
}

export default Header;
