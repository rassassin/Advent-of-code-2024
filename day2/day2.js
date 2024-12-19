const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split(/\r?\n/);

function parseInput(input) {
  const inputAsNumArray = [];
  for (const line of input) {
    for (const report of line.split(/\r?\n+/)) {
      inputAsNumArray.push(report.split(" ").map(Number));
    }
  }
  return inputAsNumArray;
}

const getSafeLevelsCount = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    if (isReportSafe(parsedReports[i])) count++;
  }
  return count;
};

const isReportSafe = (arr) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) isDecreasing = false;
    if (arr[i] > arr[i + 1]) isIncreasing = false;
    if (!isDecreasing && !isIncreasing) {
      return false;
    }
    const differenceBetweenNumbers = Math.abs(arr[i] - arr[i + 1]);
    if (differenceBetweenNumbers < 1 || differenceBetweenNumbers > 3) {
      return false;
    }
  }

  return true;
};

const problemDampener = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    const report = parsedReports[i];
    const isSafe = isReportSafe(report);
    if (isSafe) {
      count++;
      continue;
    }
    for (let skip = 0; skip < report.length; skip++) {
      const skipped = [...report.slice(0, skip), ...report.slice(skip + 1)];
      if (isReportSafe(skipped)) {
        count++;
        break;
      }
    }
  }
  return count;
};

function solveDayTwo(input) {
  const parsedReports = parseInput(input);
  const solvePartOne = getSafeLevelsCount(parsedReports);
  const solvePartTwo = problemDampener(parsedReports);
  return { solvePartOne, solvePartTwo };
}

console.log(solveDayTwo(input));
