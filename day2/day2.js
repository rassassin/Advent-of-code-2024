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

const difference = (a, b) => {
  return Math.abs(a - b);
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
    for (let j = 0; j < parsedReports[i].length; j++) {
      const arrayDecreasingOrIncreasing = arrayIncreasingOrDecreasing(parsedReports[i]);
      if (!arrayDecreasingOrIncreasing) break;
      const differenceBetweenNumbers = difference(parsedReports[i][j], parsedReports[i][j + 1]);
      if (differenceBetweenNumbers < 1 || differenceBetweenNumbers > 3) break;
      if (j === parsedReports[i].length - 1) {
        console.log(parsedReports[i]);
        count++;
      }
    }
  }
  return count;
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  const numberOfSafeLevels = getSafeLevelsCount(parsedReports);
  return numberOfSafeLevels;
}

console.log(solveDayTwo(input));

// function parseInput(input) {
//   let listOfLevelsAsStrings = [];
//   for (const line of input) {
//     listOfLevelsAsStrings = line.split(/\r?\n+/);
//   }

//   let listOfLevelsAsArrayOfStrings = [];
//   for (let i = 0; i < listOfLevelsAsStrings.length; i++) {
//     listOfLevelsAsArrayOfStrings[i] = [listOfLevelsAsStrings[i]];
//   }

//   let inputAsNumArray = [];
//   for (const level of listOfLevelsAsArrayOfStrings) {
//     for (const report of level) {
//       const value = report.split(" ").map(Number);
//       inputAsNumArray.push(value);
//     }
//   }
//   return [inputAsNumArray];
// }

// function parseInput(input) {
//   let listOfLevelsAsStrings = input.map((line) => line.split(/\r?\n+/));
//   const listOfLevelsAsArrayOfStrings = listOfLevelsAsStrings.map((stringArray) => stringArray.map((str) => [str]));
//   let newVar = [];
//   for (const level of listOfLevelsAsArrayOfStrings[0][0]) {
//     newVar = level.split(" ");
//   }

//   return listOfLevelsAsArrayOfStrings;
// }

// let listOfLevelsAsArrayOfStrings = listOfLevelsAsStrings.map((string, i) => (string[i] = [string[i]]));
