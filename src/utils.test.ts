import {formatAsteroidName, formatDistance, formatWordDeclension, getNextDate} from './utils';

describe('formatDistance', () => {
  it('should format correctly', () => {
    expect(formatDistance('1234567')).toBe('1 234 567');
    expect(formatDistance('1000')).toBe('1 000');
    expect(formatDistance('10')).toBe('10');
  });
});

describe('formatWordDeclension', () => {
  const wordForms: [string, string, string] = ['товар', 'товара', 'товаров'];

  it('should return correct word form', () => {
    expect(formatWordDeclension(1, wordForms)).toBe('товар');
    expect(formatWordDeclension(2, wordForms)).toBe('товара');
    expect(formatWordDeclension(5, wordForms)).toBe('товаров');
    expect(formatWordDeclension(11, wordForms)).toBe('товаров');
    expect(formatWordDeclension(22, wordForms)).toBe('товара');
  });
});

describe('getNextDate', () => {
  it('should return the next date', () => {
    const date = new Date('2023-01-01');
    expect(getNextDate(date, 1).toISOString()).toBe('2023-01-02T00:00:00.000Z');
    expect(getNextDate(date, 5).toISOString()).toBe('2023-01-06T00:00:00.000Z');
  });
});

describe('formatAsteroidName', () => {
  it('should format name correctly', () => {
    expect(formatAsteroidName('(Asteroid) Name')).toBe('Asteroid');
    expect(formatAsteroidName('(Another) Name')).toBe('Another');
    expect(formatAsteroidName('Сommon name')).toBe('Сommon name');
  });
});
