'use client'
import {Dispatch, PropsWithChildren, SetStateAction, createContext, useState} from 'react';

export type DistanceType = 'kilometers' | 'lunar';

export const DistanceContext = createContext<DistanceType>('kilometers');
export const DistanceDispatchContext = createContext<Dispatch<SetStateAction<DistanceType>>>(() => {});

export function DistanceProvider({children}: PropsWithChildren) {
  const [activeDistance, setActiveDistance] = useState<DistanceType>('kilometers');

  return (
    <DistanceContext.Provider value={activeDistance}>
      <DistanceDispatchContext.Provider value={setActiveDistance}>
        {children}
      </DistanceDispatchContext.Provider>
    </DistanceContext.Provider>
  );
}
