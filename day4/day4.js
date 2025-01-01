const fs = require("fs");
const input = fs.readFileSync("./day4input.txt", "utf-8").split("\n");

const parseDataTo2DArray = (input) => input.map((row) => row.split(""));

const solveDayFour = (input) => {
  const twoDimensionalArray = parseDataTo2DArray(input);
  return twoDimensionalArray;
};

console.log(solveDayFour(input));
