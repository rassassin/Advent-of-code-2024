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
    if (!isDecreasing && !isIncreasing) break;
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

const differenceDampened = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const differenceBetweenNumbers = Math.abs(arr[i] - arr[i + 1]);
    if (differenceBetweenNumbers < 1 || differenceBetweenNumbers > 3) {
      arr.splice(i + 1, 1);
      break;
    }
  }
  return;
};

const arrayIncreasingOrDecreasingDampened = (arr) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) isDecreasing = false;
    if (arr[i] > arr[i + 1]) isIncreasing = false;
    if (!isDecreasing && !isIncreasing) {
      arr.splice(i + 1, 1);

      return true;
    }
  }

  return false;
};

const problemDampener = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    const arrayOrderDampened = arrayIncreasingOrDecreasingDampened(parsedReports[i]);
    if (arrayOrderDampened) differenceDampened(parsedReports[i]);
    const validOrder = arrayIncreasingOrDecreasing(parsedReports[i]);
    const validDifference = difference(parsedReports[i]);

    if (validOrder && validDifference) {
      console.log(parsedReports[i]);
      count++;
    }
  }
  return count;
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  const solvePartOne = getSafeLevelsCount(parsedReports);
  const solvePartTwo = problemDampener(parsedReports);
  return solvePartTwo;
}

console.log(solveDayTwo(input));
