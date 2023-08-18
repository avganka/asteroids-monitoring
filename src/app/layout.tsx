import Header from '@/components/Header/Header';
import './globals.css';
import type {Metadata} from 'next';
import PlanetDecoration from '@/components/PlanetDecoration/PlanetDecoration';
import {PropsWithChildren} from 'react';
import {DistanceProvider} from '@/context/DistanceContext';
import {CartProvider} from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Asteroids',
  description: 'Сервис по покупки сближений с планетой Земля. Мы лучшие во всей вселенной',
};

function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang='ru'>
      <body>
        <DistanceProvider>
          <CartProvider>
            <Header />
            <PlanetDecoration />
            <main className='container'>{children}</main>
          </CartProvider>
        </DistanceProvider>
      </body>
    </html>
  );
}

export default RootLayout;
