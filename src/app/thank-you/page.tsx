'use client';
import AsteroidsList from '@/components/AsteroidsList/AsteroidsList';
import Heading from '@/components/Heading/Heading';
import {CartContext, CartDispatchContext} from '@/context/CartContext';
import {useContext, useEffect} from 'react';

function ThankYouPage() {
  const cartItems = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  useEffect(() => {
    return () => dispatch([]);
  }, [dispatch]);

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <Heading>Корзина пуста</Heading>
        </>
      ) : (
        <>
          <Heading>Заказ отправлен</Heading>
          <AsteroidsList asteroids={cartItems} hideOrderBtn={true} />
        </>
      )}
    </>
  );
}

export default ThankYouPage;
