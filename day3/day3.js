const fs = require("fs");
const input = fs.readFileSync("./day3input.txt", "utf-8").split("/\r?\n/");

function getOnlyNumbers(arrOfStrings) {
  let onlyRelevantNumsAsStrings = [];
  for (let i = 0; i < arrOfStrings.length; i++) {
    let result = "";
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      if (!isNaN(arrOfStrings[i][j]) && arrOfStrings[i][j + 1] === ")") {
        result += arrOfStrings[i][j];
        break;
      }
      result += arrOfStrings[i][j];
    }
    onlyRelevantNumsAsStrings.push(result);
  }
  return onlyRelevantNumsAsStrings;
}

function getOnlyNumbersAndStrings(arrOfStrings) {
  let onlyRelevantNumsAsStrings = [];
  const doString = "do()";
  const dontString = "don't()";

  for (let i = 0; i < arrOfStrings.length; i++) {
    let checkForStringFlag = true;
    let result = "";
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      if (!isNaN(arrOfStrings[i][j]) && arrOfStrings[i][j + 1] === ")" && checkForStringFlag) {
        result += arrOfStrings[i][j];
        onlyRelevantNumsAsStrings.push(result);
        !checkForStringFlag;
      }
      // if (checkForStringFlag && arrOfStrings[i][j].endsWith(doString)) {
      // }
      if (checkForStringFlag) result += arrOfStrings[i][j];
    }
  }
  return onlyRelevantNumsAsStrings;
}

const parseInput = (input) => {
  const splitAllMulStrings = input[0].split("mul(");
  const onlyNumbersAsStrings = getOnlyNumbersAndStrings(splitAllMulStrings);
  let arr = [];
  for (let i = 0; i < onlyNumbersAsStrings.length; i++) {
    let temp = onlyNumbersAsStrings[i]
      .split(",")
      .map((i) => Number(i))
      .filter((elm) => elm);
    if (temp.length == 2) arr.push(temp);
  }
  return arr.flat();
};

const parseInputForPart2 = (input) => {
  const splitAllMulStrings = input[0].split(/mul\(|(don't\(\)|do\(\))/).filter((elm) => elm);
  console.log(splitAllMulStrings);
};

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
