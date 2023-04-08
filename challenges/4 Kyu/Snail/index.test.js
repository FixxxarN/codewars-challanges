/* 

Snail Sort
Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
This image will illustrate things more clearly:


NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as en empty array inside an array [[]].

*/

const snail = (array) => {
  const flattedArray = array.flat();

  if (!flattedArray.length) {
    return [];
  }

  let topIndex = 0;
  let rightIndex = array[0].length - 1;
  let bottomIndex = array.length - 1;
  let leftIndex = 0;

  let corners = {
    topRight: { y: topIndex, x: rightIndex },
    bottomRight: { y: bottomIndex, x: rightIndex },
    bottomLeft: { y: bottomIndex, x: leftIndex },
    topLeft: { y: topIndex, x: leftIndex },
  }

  let xIndex = 0;
  let yIndex = 0;

  let closeToNewRound = false;

  const arr = [];

  while (arr.length !== flattedArray.length) {
    console.log(arr);
    if (arr.length > 0 && xIndex === corners.topLeft.x && yIndex === corners.topLeft.y && closeToNewRound) {
      xIndex++;
      yIndex++;
      topIndex++;
      rightIndex--;
      bottomIndex--;
      leftIndex++;
      corners.topRight = { y: topIndex, x: rightIndex };
      corners.bottomRight = { y: bottomIndex, x: rightIndex };
      corners.bottomLeft = { y: bottomIndex, x: leftIndex };
      corners.topLeft = { y: topIndex, x: leftIndex };
      closeToNewRound = false;
      continue;
    }
    if (yIndex === topIndex) {
      console.log('adding', array[yIndex][xIndex]);
      arr.push(array[yIndex][xIndex]);
      if (xIndex === corners.topRight.x) {
        yIndex++;
      }
      else {
        xIndex++;
      }
      continue;
    }
    if (xIndex === rightIndex) {
      arr.push(array[yIndex][xIndex]);
      if (yIndex === corners.bottomRight.y) {
        xIndex--;
      }
      else {
        yIndex++;
      }
      continue;
    }
    if (yIndex === bottomIndex) {
      arr.push(array[yIndex][xIndex]);
      if (xIndex === corners.bottomLeft.x) {
        yIndex--;
      }
      else {
        xIndex--;
      }
      continue;
    }
    if (xIndex === leftIndex) {
      arr.push(array[yIndex][xIndex]);
      closeToNewRound = true;
      yIndex--;
      continue;
    }
  }

  return arr;
}

describe('Snail', () => {
  it('should return an empty array if the matrix is empty', () => {
    const result = snail([[]]);
    expect(result).toEqual([]);
  });

  it('should run through the matrix clockwise and if there is only one value it should return that value', () => {
    const result = snail([[1]]);
    expect(result).toEqual([1]);
  });

  it('should run through the matrix clockwise 2x2', () => {
    const result = snail([[1, 2], [4, 5]]);
    expect(result).toEqual([1, 2, 5, 4]);
  });

  it('should run through the matrix clockwise and return the values in a snail shell pattern', () => {
    const result = snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(result).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  it('should run through the matrix clockwise and return the values in a snail shell pattern with a bigger matrix', () => {
    const result = snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]);
    expect(result).toEqual([1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
  });
});

// [1,  2,  3,  4,  5], 
// [6,  7,  8,  9,  10], 
// [11, 12, 13, 14, 15], 
// [16, 17, 18, 19, 20], 
// [21, 22, 23, 24, 25]