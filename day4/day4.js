const fs = require("fs");
const input = fs.readFileSync("./day4input.txt", "utf-8").split("\n");
const xDir = [-1, -1, -1, 0, 0, 1, 1, 1];
const yDir = [-1, 0, 1, -1, 1, -1, 0, 1];

const xUpdatedDir = [-1, -1, 1, 1];
const yUpdatedDir = [-1, 1, -1, 1];

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

const findMasPattern = (twoDimensionalArray, row, col) => {
  let count = 0;

  for (let dir = 0; dir < 4; dir++) {
    let currX = row + xUpdatedDir[dir];
    let currY = col + xUpdatedDir[dir];
    for (let i = 0; i < twoDimensionalArray.length; i++) {
      if (currX >= twoDimensionalArray.length || currX < 0 || currY >= twoDimensionalArray[i].length || currY < 0) break;
    }
  }
};

const searchForXmas = (twoDimensionalArray) => {
  let count = 0;

  for (let i = 0; i < twoDimensionalArray.length; i++) {
    for (let j = 0; j < twoDimensionalArray[i].length; j++) {
      if (twoDimensionalArray[i][j] === "A") count += findMasPattern(twoDimensionalArray, i, j);
    }
  }
};

const solveDayFour = (input) => {
  const twoDimensionalArray = parseDataTo2DArray(input);
  const partOne = searchForWord(twoDimensionalArray, "XMAS");
  const partTwo = searchForXmas(twoDimensionalArray);
  return { partOne, partTwo };
};

console.log(solveDayFour(input));
