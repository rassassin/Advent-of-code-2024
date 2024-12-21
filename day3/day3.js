const fs = require("fs");
const input = fs.readFileSync("./day3input.txt", "utf-8").split("/\r?\n/");

const parseInput = (input) =>
  input[0]
    .split(/['mul('','')']/)
    .map((i) => Number(i))
    .filter((elm) => elm);

const solvePartOne = (numArray) => {
  let count = 0;
  for (let i = 0; i < numArray.length; i += 2) {
    count += numArray[i] * numArray[i + 1];
  }
  return count;
};

const solveDayThree = (input) => {
  const getInputAsNumArray = parseInput(input);
  const partOne = solvePartOne(getInputAsNumArray);
  return partOne;
};

console.log(solveDayThree(input));
