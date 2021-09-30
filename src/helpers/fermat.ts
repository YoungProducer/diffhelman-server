// // C++ program to check if N is Fermat pseudoprime
// // to the base A or not

// // Function to check if the given number is composite
// const checkcomposite = (n: number) => {
//   // Check if there is any divisor of n less than sqrt(n)
//   for (let i = 2; i <= Math.sqrt(n); i++) {
//     if (n % i == 0) return true;
//   }
//   return false;
// };

// // Effectively calculate (x^y) modulo mod
// const power = (x: number, y: number, mod: number) => {
//   // Initialize result
//   let res = 1;

//   while (y) {
//     // If power is odd, then update the answer
//     if (y & 1) res = (res * x) % mod;

//     // Square the number and reduce
//     // the power to its half
//     y = y >> 1;
//     x = (x * x) % mod;
//   }

//   // Return the result
//   return res;
// };

// // Function to check for Fermat Pseudoprime
// export const fermat = (n: number, a: number) => {
//   // If it is composite and satisfy Fermat criterion
//   if (a > 1 && checkcomposite(n) && power(a, n - 1, n) == 1) return true;

//   // Else return 0
//   return false;
// };

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function gcd(a: number, b: number) {
  if (a === 0) return b;

  while (b !== 0) {
    if (a > b) a = a - b;
    else b = b - a;
  }

  return a;
}

const power = (x: number, y: number, mod: number) => {
  // Initialize result
  let res = 1;

  while (y) {
    // If power is odd, then update the answer
    if (y & 1) res = (res * x) % mod;

    // Square the number and reduce
    // the power to its half
    y = y >> 1;
    x = (x * x) % mod;
  }

  // Return the result
  return res;
};

function fermat(x: number, p: number) {
  return power(x, p - 1, p);
}

export const generate = (maxK: number, min: number, max: number): number => {
  let pParam = getRandomInt(min, max);

  let k = 0;

  while (true) {
    const x = getRandomInt(1, pParam);

    if (gcd(x, pParam) !== 1) continue;

    if (fermat(x, pParam)) {
      k++;

      if (k < maxK) continue;
      return pParam;
    } else {
      pParam = getRandomInt(min, max);
      k = 0;
    }
  }
};
