const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split("/\r?\n/");

function parseInput(input) {
  let listOfLevelsAsStrings = [];
  let listOfLevelsAsArrayOfStrings = [];
  for (const line of input) {
    listOfLevelsAsStrings = line.split(/\r?\n+/);
  }
  for (let i = 0; i < listOfLevelsAsStrings.length; i++) {
    listOfLevelsAsArrayOfStrings[i] = [listOfLevelsAsStrings[i]];
  }
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
