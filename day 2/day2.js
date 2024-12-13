const fs = require("fs");
const input = fs.readFileSync("./day2input.txt", "utf-8").split("/\r?\n/");

function parseInput(input) {
  let listOfLevels = [];
  for (const line of input) {
    listOfLevels = line.split(/\r?\n+/);
  }
  return listOfLevels;
}

console.log(parseInput(input));
