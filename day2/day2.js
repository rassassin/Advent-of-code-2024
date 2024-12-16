const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split("/\r?\n/");

function parseInput(input) {
  const inputAsNumArray = [];
  for (const line of input) {
    for (const report of line.split(/\r?\n+/)) {
      inputAsNumArray.push(report.split(" ").map(Number));
    }
  }
  return inputAsNumArray;
}

const difference = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const differenceBetweenNumbers = Math.abs(arr[i] - arr[i + 1]);
    if (differenceBetweenNumbers < 1 || differenceBetweenNumbers > 3) return false;
  }
  return true;
};

const arrayIncreasingOrDecreasing = (arr) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) isDecreasing = false;
    if (arr[i] > arr[i + 1]) isIncreasing = false;
  }

  return isIncreasing || isDecreasing;
};

const getSafeLevelsCount = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    const validOrder = arrayIncreasingOrDecreasing(parsedReports[i]);
    const validDifference = difference(parsedReports[i]);

    if (validOrder && validDifference) count++;
  }
  return count;
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  const numberOfSafeLevels = getSafeLevelsCount(parsedReports);
  return numberOfSafeLevels;
}

console.log(solveDayTwo(input));
