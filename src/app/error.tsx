'use client';
import Button from '@/components/Button/Button';
import Heading from '@/components/Heading/Heading';
import {useEffect} from 'react';

export default function Error({error, reset}: {error: Error; reset: () => void}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Heading>Упс! Что-то пошло нет так...</Heading>
      <p style={{
				marginBottom: '20px'
			}}>{error.message}</p>
      <Button onClick={() => reset()}>Попробовать еще раз</Button>
    </>
  );
}
