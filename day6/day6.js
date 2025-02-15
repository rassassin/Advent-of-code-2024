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

function isGuardStillInMap(twoDimensionalArray, row, col) {
  return !(row < 0 || row >= twoDimensionalArray.length || col < 0 || col >= twoDimensionalArray[row].length);
}

function solvePartOne(parsedInput) {
  let directionGuardIsMoving = guardDirections[0];
  const currentGuardPosition = findGuardPos(parsedInput);
  let isGuardInMap = true;
  const history = {};
  history[currentGuardPosition.join(",")] = true;
  while (isGuardInMap) {
    currentGuardPosition[0] += directionGuardIsMoving[0];
    currentGuardPosition[1] += directionGuardIsMoving[1];
    isGuardInMap = isGuardStillInMap(parsedInput, currentGuardPosition[0], currentGuardPosition[1]);
    if (!isGuardInMap) break;
    if (parsedInput[currentGuardPosition[1]][currentGuardPosition[0]] == "#") {
      currentGuardPosition[0] -= directionGuardIsMoving[0];
      currentGuardPosition[1] -= directionGuardIsMoving[1];
      directionGuardIsMoving = changeGuardDirection(directionGuardIsMoving);
      continue;
    }
    history[currentGuardPosition.join(",")] = true;
  }
  return Object.keys(history).length;
}

function solveDaySix(input) {
  const parsedInput = parseDataTo2DArray(input);
  const dayOne = solvePartOne(parsedInput);
  return dayOne;
}

function printGrid(parsedInput, currentGuardPosition, history) {
  for (let i = 0; i < parsedInput.length; i++) {
    const row = parsedInput[i];
    let line = "";
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "#") {
        line += "#";
        continue;
      }
      if (i == currentGuardPosition[1] && j == currentGuardPosition[0]) {
        line += "^";
        continue;
      }
      if (history[`${j},${i}`]) {
        line += "X";
        continue;
      }
      line += ".";
    }
    console.log(line);
  }
}

console.log(solveDaySix(input));
