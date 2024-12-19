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

const isReportSafe = (arr) => {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) isDecreasing = false;
    if (arr[i] > arr[i + 1]) isIncreasing = false;
    if (!isDecreasing && !isIncreasing) {
      return [false, i];
    }
    const differenceBetweenNumbers = Math.abs(arr[i] - arr[i + 1]);
    if (differenceBetweenNumbers < 1 || differenceBetweenNumbers > 3) {
      return [false, i];
    }
  }

  return [true, -1];
};

const getSafeLevelsCount = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    const [isSafe, _] = isReportSafe(parsedReports[i]);
    if (isSafe) count++;
  }
  return count;
};

const problemDampener = (parsedReports) => {
  let count = 0;
  for (let i = 0; i < parsedReports.length; i++) {
    const report = parsedReports[i];
    const [isSafe, badIndex] = isReportSafe(report);
    if (isSafe) {
      count++;
      continue;
    }
    for (let skip = badIndex - 1; skip <= badIndex + 1; skip++) {
      const skipped = [...report.slice(0, skip), ...report.slice(skip + 1)];
      const [isSafe, _] = isReportSafe(skipped);
      if (isSafe) {
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
