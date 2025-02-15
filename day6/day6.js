const fs = require("fs");
const input = fs.readFileSync("./day6input.txt", "utf-8").split("\n");
const guardDirections = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const parseDataTo2DArray = (input) => input.map((row) => row.split(""));

function findGuardPos(parsedInput) {
  for (let y = 0; y < parsedInput.length; y++) {
    for (let x = 0; x < parsedInput[y].length; x++) {
      if (parsedInput[y][x] === "^") return [x, y];
    }
  }
}

function changeGuardDirection(guardDirection) {
  if (guardDirection == guardDirections[0]) return guardDirections[1];
  if (guardDirection == guardDirections[1]) return guardDirections[2];
  if (guardDirection == guardDirections[2]) return guardDirections[3];
  if (guardDirection == guardDirections[3]) return guardDirections[0];
}

function hasGuardLeftMap(twoDimensionalArray, row, col) {
  if (row < 0 || row >= twoDimensionalArray.length || col < 0 || col >= twoDimensionalArray[row].length) {
    return false;
  }
  return true;
}

function solvePartOne(parsedInput) {
  let directionGuardIsMoving = guardDirections[0];
  const currentGuardPosition = findGuardPos(parsedInput);
  let isGuardInMap = true;
  let steps = 0;
  while (isGuardInMap) {
    currentGuardPosition[0] += directionGuardIsMoving[0];
    currentGuardPosition[1] += directionGuardIsMoving[1];
    console.log(parsedInput[currentGuardPosition[0]][currentGuardPosition[1]]);
    if (parsedInput[currentGuardPosition[0]][currentGuardPosition[1]] === "#") {
      directionGuardIsMoving = changeGuardDirection(directionGuardIsMoving);
      continue;
    }
    isGuardInMap = hasGuardLeftMap(parsedInput, currentGuardPosition[0], currentGuardPosition[1]);
    console.log(isGuardInMap);
    if (!isGuardInMap) break;
    steps++;
  }
  return steps;
}

function solveDaySix(input) {
  const parsedInput = parseDataTo2DArray(input);
  const dayOne = solvePartOne(parsedInput);
  return dayOne;
}

console.log(solveDaySix(input));
