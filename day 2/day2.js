const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split("/\r?\n/");

function parseInput(input) {
  let listOfLevelsAsStrings = input.map((line) => line.split(/\r?\n+/));
  let listOfLevelsAsArrayOfStrings = listOfLevelsAsStrings.map((stringArray) => stringArray.map((str) => [str]));
  return listOfLevelsAsArrayOfStrings;
}

const getSafeLevelsCount = (parsedReports) => {
  // for (const report of parsedReports) {
  //   console.log(report);
  //   for (const level of report) {
  //   }
  // }
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  console.log(parsedReports);
  const numberOfSafeLevels = getSafeLevelsCount(parsedReports);
}

solveDayTwo(input);

// let listOfLevelsAsArrayOfStrings = listOfLevelsAsStrings.map((string, i) => (string[i] = [string[i]]));
