const fs = require("fs");
const input = fs.readFileSync("./day1input.txt", "utf-8").split("\n");

function getNumberColumns(input) {
  const columnOne = [];
  const columnTwo = [];
  for (const line of input) {
    const [numberOne, numberTwo] = line.split(/\s+/);
    columnOne.push(numberOne);
    columnTwo.push(numberTwo);
  }
  return { columnOne, columnTwo };
}

const sortArrayByValue = (arr) => arr.sort((a, b) => a - b);

const difference = (a, b) => Math.abs(a - b);

function findDifferencesBetweenValues(arr1, arr2) {
  let totalDifference = 0;
  if (arr1.length != arr2.length) return;
  for (let i = 0; i < arr1.length; i++) {
    totalDifference += difference(arr1[i], arr2[i]);
  }
  return totalDifference;
}

function dayOne(input) {
  const { columnOne, columnTwo } = getNumberColumns(input);
  const sortedColumnOne = sortArrayByValue(columnOne);
  const sortedColumnTwo = sortArrayByValue(columnTwo);
  return findDifferencesBetweenValues(sortedColumnOne, sortedColumnTwo);
}

console.log(dayOne(input));
