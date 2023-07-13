/* 
Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

12 ==> 21
513 ==> 531
2017 ==> 2071

If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift, None in Rust):

9 ==> -1
111 ==> -1
531 ==> -1
*/

const getIndexOfBiggerNumber = (arr, n) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > n) return i;
  }
}

const nextBigger = (n) => {
  const arr = n.toString().split('');

  const hasArrayOnlyOneValue = arr.length === 1;
  const hasArrayOnlySameValues = arr.every((number) => number === arr[0]);

  if (hasArrayOnlyOneValue || hasArrayOnlySameValues) return -1;

  let numbersChecked = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = arr.length - 1 - numbersChecked; j >= 0; j--) {
      if (arr[i] > arr[j - 1]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[getIndexOfBiggerNumber(arr, temp)];
        arr[getIndexOfBiggerNumber(arr, temp)] = temp;

        const leftSide = arr.join('').slice(0, j);
        const rightSide = arr.join('').slice(j, arr.length).split('').sort().join('');

        return Number(leftSide + rightSide);
      }
      else {
        i--;
      }
    }
    numbersChecked++;
  }

  return -1;
}

describe('Next bigger number with the same digits', () => {
  it('should return -1 for single numbers', () => {
    const result = nextBigger(1);
    expect(result).toEqual(-1);
  });
  it('should return -1 for numbers that are all the same like 111', () => {
    const result = nextBigger(111);
    expect(result).toEqual(-1);
  });
  it('should return -1 for numbers that are already at their max next bigger', () => {
    const result = nextBigger(21);
    expect(result).toEqual(-1);
  });
  it('should return next big number for two numbers', () => {
    const result = nextBigger(12);
    expect(result).toEqual(21);
  });
  it('should return next big number for three numbers', () => {
    const result = nextBigger(527);
    expect(result).toEqual(572);
  });
  it('should return next big number for three other numbers', () => {
    const result = nextBigger(121);
    expect(result).toEqual(211);
  });
  it('should return next big number for four numbers', () => {
    const result = nextBigger(1376);
    expect(result).toEqual(1637);
  });
  it('should return next big number for five numbers', () => {
    const result = nextBigger(98841);
    expect(result).toEqual(-1);
  });
  it('should handle bigger numbers', () => {
    const result = nextBigger(9876543120);
    expect(result).toEqual(9876543201);
  });
  it('should handle random numbers', () => {
    const result = nextBigger(59884848459853);
    expect(result).toEqual(59884848483559);
  });
});