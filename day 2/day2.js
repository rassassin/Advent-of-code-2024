const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split("/\r?\n/");

function parseInput(input) {
  const inputAsNumArray = [];

  for (const line of input) {
    for (const report of line.split(/\r?\n+/)) {
      inputAsNumArray.push(report.split(" ").map(Number));
    }
  }

  return [inputAsNumArray];
}

const getSafeLevelsCount = (parsedReports) => {
  for (const report of parsedReports) {
    console.log(report[0][0]);
  }
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  const numberOfSafeLevels = getSafeLevelsCount(parsedReports);
}

solveDayTwo(input);

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
