/*

Given two integers a and b, which can be positive or negative, 
find the sum of all the integers between and including them and return it. 
If the two numbers are equal return a or b.

Note: a and b are not ordered!

*/

const getSum = (a, b) => {
  const minValue = Math.min(...[a,b]);
  const maxValue = Math.max(...[a,b]);

  let sum = 0;

  for(let i = minValue; i <= maxValue; i++) {
    sum += i;
  }

  return sum;
}

describe('Beginner Series #3 Sum of Numbers', () => {
  it('should return the sum between two positive numbers', () => {
    const result = getSum(1,2); // 1 + 2
    expect(result).toBe(3);
  });

  it('should return the sum between one negative and one positive number', () => {
    const result = getSum(-1,2); // -1 + 0 + 1 + 2 = 2
    expect(result).toBe(2);
  });

  it('should return the sum between two negative numbers', () => {
    const result = getSum(-1, -3); // -1 + -2 + -3 = -6
    expect(result).toBe(-6);
  });

  it('should return either if the numbers are the same', () => {
    const result = getSum(2, 2);
    expect(result).toBe(2);
  });
});