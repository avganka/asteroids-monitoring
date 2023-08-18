import axios from 'axios';
import {format, formatISO} from 'date-fns';

export function formatDistance(distance: string) {
  let str = parseInt(distance).toString();
  let res = '';
  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    count++;
    res = str[i] + res;

    if (count % 3 === 0 && i !== 0) {
      res = ' ' + res;
    }
  }

  return res;
}

//export async function getData<T>(params: Record<string, string | number>): Promise<T | undefined> {
export async function getData<T>(startDate = new Date()): Promise<T | undefined> {
  const authParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_NASA_API_TOKEN || '',
    start_date: formatISO(startDate, {representation: 'date'}),
    end_date: formatISO(getNextDate(startDate), {representation: 'date'}),
    //...params,
  });

  try {
    const {data} = await axios.get<T>('https://api.nasa.gov/neo/rest/v1/feed', {
      params: authParams,
    });
    return data;
  } catch (error) {
    // TODO handle error
    console.log(error);
  }
}

export function formatWordDeclension(count: number, wordForms: [string, string, string]) {
  // пример форм для аргумента wordForms ['товар', 'товара', 'товаров']
  count = Math.abs(count) % 100;
  const num = count % 10;
  if (count > 10 && count < 20) return wordForms[2];
  if (num > 1 && num < 5) return wordForms[1];
  if (num == 1) return wordForms[0];
  return wordForms[2];
}

export const getNextDate = (currentDate = new Date(), daysToAdd = 1) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};
