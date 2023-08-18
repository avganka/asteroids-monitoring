import axios from 'axios';
import {formatISO} from 'date-fns';
import {getNextDate} from './utils';

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

export async function fetchAsteroidsList<T>(startDate = new Date()): Promise<T | undefined> {
  const authParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_NASA_API_TOKEN || '',
    start_date: formatISO(startDate, {representation: 'date'}),
    end_date: formatISO(getNextDate(startDate), {representation: 'date'}),
  });

  try {
    const {data} = await axios.get<T>(`${BASE_URL}/feed`, {
      params: authParams,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAsteroid<T>(asteroidId: string): Promise<T | undefined> {
  const authParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_NASA_API_TOKEN || '',
  });

  try {
    const {data} = await axios.get<T>(`${BASE_URL}/neo/${asteroidId}`, {
      params: authParams,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
