const fs = require("fs");
const input = fs.readFileSync("./day4input.txt", "utf-8").split("\n");
const xDir = [-1, -1, -1, 0, 0, 1, 1, 1];
const yDir = [-1, 0, 1, -1, 1, -1, 0, 1];

const vectors = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const parseDataTo2DArray = (input) => input.map((row) => row.split(""));

const search2DArray = (twoDimensionalArray, row, col, word) => {
  if (twoDimensionalArray[row][col] !== word[0]) return false;

  let count = 0;

  for (let dir = 0; dir < 8; dir++) {
    let currX = row + xDir[dir];
    let currY = col + yDir[dir];
    let charToCheck = 1;

    for (charToCheck = 1; charToCheck < word.length; charToCheck++) {
      if (currX >= twoDimensionalArray.length || currX < 0 || currY >= twoDimensionalArray[0].length || currY < 0 || twoDimensionalArray[currX][currY] !== word[charToCheck]) break;

      currX += xDir[dir];
      currY += yDir[dir];
    }

    if (charToCheck === word.length) count++;
  }

  return count;
};

function searchForWord(twoDimensionalArray, word) {
  let count = 0;

  for (let i = 0; i < twoDimensionalArray.length; i++) {
    for (let j = 0; j < twoDimensionalArray[i].length; j++) {
      count += search2DArray(twoDimensionalArray, i, j, word);
    }
  }

  return count;
}

function getCross(i, j, twoDimensionalArray) {
  const cross = [];
  for (const vec of vectors) {
    const I = i + vec[0];
    const J = j + vec[1];
    cross.push(twoDimensionalArray[I][J]);
  }
  return cross.join("");
}

const validCrosses = ["MMSS", "MSMS", "SSMM", "SMSM"];

const countMasPattern = (twoDimensionalArray) => {
  let count = 0;
  for (let i = 1; i < twoDimensionalArray.length - 1; i++) {
    for (let j = 1; j < twoDimensionalArray[i].length - 1; j++) {
      if (twoDimensionalArray[i][j] === "A") {
        const cross = getCross(i, j, twoDimensionalArray);
        count += +validCrosses.includes(cross);
      }
    }
  }
  return count;
};

const solveDayFour = (input) => {
  const twoDimensionalArray = parseDataTo2DArray(input);
  const partOne = searchForWord(twoDimensionalArray, "XMAS");
  const partTwo = countMasPattern(twoDimensionalArray);
  return { partOne, partTwo };
};

console.log(solveDayFour(input));
