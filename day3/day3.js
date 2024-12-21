const fs = require("fs");
const input = fs.readFileSync("./day3input.txt", "utf-8").split("/\r?\n/");

const parseInput = (input) =>
  input[0]
    .split(/['mul('','')']/)
    .map((i) => Number(i))
    .filter((elm) => elm);

const solveDayThree = (input) => {
  const getInputAsNumArray = parseInput(input);
};

console.log(parseInput(input));
