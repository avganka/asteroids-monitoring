'use client'
import {NearEarthObject} from '@/types';
import {Dispatch, PropsWithChildren, SetStateAction, createContext, useState} from 'react';

export const CartContext = createContext<NearEarthObject[]>([]);
export const CartDispatchContext = createContext<
  Dispatch<SetStateAction<NearEarthObject[]>>
>(() => {});

export function CartProvider({children}: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<NearEarthObject[]>([]);

  return (
    <CartContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={setCartItems}>{children}</CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
