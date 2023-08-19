import {CloseApproachData} from './types';

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

export function formatWordDeclension(count: number, wordForms: [string, string, string]) {
  // пример форм для аргумента wordForms ['товар', 'товара', 'товаров']
  count = Math.abs(count) % 100;
  const num = count % 10;
  if (count > 10 && count < 20) return wordForms[2];
  if (num > 1 && num < 5) return wordForms[1];
  if (num == 1) return wordForms[0];
  return wordForms[2];
}

export function getNextDate(currentDate = new Date(), daysToAdd = 1) {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
}

export function formatAsteroidName(name: string) {
  const regexp = /\(([^)]+)\)/
  if (regexp.test(name)) {
    return name.match(regexp)![0].slice(1, -1);
  }
  return name;
}

export function sortApproaches(approaches: CloseApproachData[]) {
  return approaches.sort((a, b) => {
    const dateA = new Date(a.close_approach_date_full);
    const dateB = new Date(b.close_approach_date_full);

    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });
}
