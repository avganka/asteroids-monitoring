'use client';
import {useContext} from 'react';
import styles from './Cart.module.css';
import {formatWordDeclension} from '@/utils';
import {CartContext} from '@/context/CartContext';
import {useRouter} from 'next/navigation';
import Button from '../Button/Button';

function Cart() {
  const cartItems = useContext(CartContext);
  const router = useRouter()

  const clickHandler = () => {
    router.push('/thank-you')
  };

  return (
    <div className={styles.cart}>
      <div>
        <h2>Корзина</h2>
        <span>
          {cartItems.length}{' '}
          {formatWordDeclension(cartItems.length, ['астероид', 'астероида', 'астероидов'])}
        </span>
      </div>
      <Button
        className={styles.cartBtn}
        onClick={clickHandler}
        disabled={cartItems.length === 0 ? true : false}
      >
        Отправить
      </Button>
    </div>
  );
}

export default Cart;
