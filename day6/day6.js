const fs = require("fs");
const input = fs.readFileSync("./day6input.txt", "utf-8").split("\n");

const parseDataTo2DArray = (input) => input.map((row) => row.split(""));

function findGuardPos(parsedInput) {
  for (let y = 0; y < parsedInput.length; y++) {
    for (let x = 0; x < parsedInput[y].length; x++) {
      if (parsedInput[y][x] === "^") return [x, y];
    }
  }
}

function changeGuardDirection(x, y) {}

function solvePartOne(parsedInput) {
  const [x, y] = findGuardPos(parsedInput);
  console.log(x, y);
}

function solveDaySix(input) {
  const parsedInput = parseDataTo2DArray(input);
  const dayOne = solvePartOne(parsedInput);
}

console.log(solveDaySix(input));
