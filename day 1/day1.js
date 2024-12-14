const fs = require("fs");
const input = fs.readFileSync("./day1input.txt", "utf-8").split("\r\n");

function parseInput(input) {
  console.log(input);
  const columnOne = [];
  const columnTwo = [];
  for (const line of input) {
    const [numberOne, numberTwo] = line.split(/\s+/);
    columnOne.push(numberOne);
    columnTwo.push(numberTwo);
  }
  return { columnOne, columnTwo };
}

const sortArrayByValue = (arr) => arr.sort((a, b) => a - b);

const difference = (a, b) => Math.abs(a - b);

function findDifferencesBetweenValues(arr1, arr2) {
  let totalDifference = 0;
  if (arr1.length != arr2.length) return;
  for (let i = 0; i < arr1.length; i++) {
    totalDifference += difference(arr1[i], arr2[i]);
  }
  return totalDifference;
}

const findNumOccurences = (arr) => {
  const occurencesObj = arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  return occurencesObj;
};

const colOneOccurences = (sortedColumnOne, columnTwoOccurencesObj) => {
  let count = 0;
  for (const number of sortedColumnOne) {
    if (columnTwoOccurencesObj.hasOwnProperty(number)) {
      count = count + number * columnTwoOccurencesObj[number];
    }
  }
  return count;
};

function solveDayOne(input) {
  const { columnOne, columnTwo } = parseInput(input);
  const sortedColumnOne = sortArrayByValue(columnOne);
  const sortedColumnTwo = sortArrayByValue(columnTwo);
  const partOne = findDifferencesBetweenValues(sortedColumnOne, sortedColumnTwo);

  const columnTwoOccurencesObj = findNumOccurences(sortedColumnTwo);
  const partTwo = colOneOccurences(sortedColumnOne, columnTwoOccurencesObj);
  return { partOne, partTwo };
}

console.log(solveDayOne(input));
