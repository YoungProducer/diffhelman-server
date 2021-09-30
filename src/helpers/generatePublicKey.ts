import { generate } from './fermat';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const isPrime = (num: number): boolean => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};

export const generatePublicKey = (from: number, to: number): number => {
  const number = generate(4, from, to);

  if (isPrime(number)) return number;
  return generatePublicKey(from, to);
};
