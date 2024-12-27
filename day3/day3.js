const fs = require("fs");
const input = fs.readFileSync("./day3input.txt", "utf-8").split("/\r?\n/");

function getOnlyNumbers(arrOfStrings) {
  let onlyRelevantNumsAsStrings = [];
  for (let i = 0; i < arrOfStrings.length; i++) {
    let result = "";
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      if (!isNaN(arrOfStrings[i][j]) && arrOfStrings[i][j + 1] === ")") {
        result += arrOfStrings[i][j];
        onlyRelevantNumsAsStrings.push(result);
        break;
      }
      result += arrOfStrings[i][j];
    }
  }
  return onlyRelevantNumsAsStrings;
}

const parseInput = (input) => {
  const splitAllMulStrings = input[0].split("mul(");
  const onlyNumbersAsStrings = getOnlyNumbers(splitAllMulStrings);
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

const solvePartOne = (numArray) => {
  let count = 0;
  for (let i = 0; i < numArray.length; i += 2) {
    count += numArray[i] * numArray[i + 1];
  }
  return count;
};

const getOnlyNumbersAndStrings = (arrOfStrings) => {
  let onlyRelevantNumsAsStrings = [];
  const doString = "do()";
  const dontString = "don't()";

  for (let i = 0; i < arrOfStrings.length; i++) {
    let checkForStringFlag = true;
    let result = "";
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      if (!isNaN(arrOfStrings[i][j]) && arrOfStrings[i][j + 1] === ")" && !/[a-zA-Z]/.test(result) && checkForStringFlag) {
        result += arrOfStrings[i][j];
        onlyRelevantNumsAsStrings.push(result);
        checkForStringFlag = false;
      }
      if (!checkForStringFlag && result.endsWith(doString)) onlyRelevantNumsAsStrings.push(doString);
      if (!checkForStringFlag && result.endsWith(dontString)) onlyRelevantNumsAsStrings.push(dontString);

      result += arrOfStrings[i][j];
    }
  }
  return onlyRelevantNumsAsStrings;
};

const parseInputForPartTwo = (input) => {
  const splitAllMulStrings = input[0].split("mul(");
  const getNumbersAndInstructionsStrings = getOnlyNumbersAndStrings(splitAllMulStrings);
  let arr = [];
  for (let i = 0; i < getNumbersAndInstructionsStrings.length; i++) {
    let temp = getNumbersAndInstructionsStrings[i].split(",").map((i) => (isNaN(Number(i)) ? i : Number(i)));
    arr.push(temp);
  }
  return arr.flat();
};

const solvePartTwo = (numArray) => {
  let count = 0;
  let continueToCount = true;
  for (let i = 0; i < numArray.length; i += 2) {
    if (numArray[i] == "don't") continueToCount = false;
    if (continueToCount && !isNaN(numArray[i])) count += numArray[i] * numArray[i + 1];
    if (numArray[i] == "do()") continueToCount = true;
  }
  return count;
};

const solveDayThree = (input) => {
  const getInputAsNumArray = parseInput(input);
  const partOne = solvePartOne(getInputAsNumArray);
  const getPartTwoInput = parseInputForPartTwo(input);
  const partTwo = solvePartTwo(getPartTwoInput);
  return partTwo;
};

console.log(solveDayThree(input));
