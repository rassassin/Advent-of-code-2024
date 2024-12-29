const fs = require("fs");
const input = fs.readFileSync("./day3input.txt", "utf-8").split("/\r?\n/");

function getOnlyNumbers(arrOfStrings) {
  let onlyRelevantNumsAsStrings = [];
  for (let i = 0; i < arrOfStrings.length; i++) {
    let result = "";
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      result += arrOfStrings[i][j];
      if (!isNaN(arrOfStrings[i][j]) && arrOfStrings[i][j + 1] === ")") {
        onlyRelevantNumsAsStrings.push(result);
        break;
      }
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
  const onlyRelevantNumsAsStrings = [];
  let dosAndDonts = [];
  const doString = "do()";
  const dontString = "don't()";

  for (let i = 0; i < arrOfStrings.length; i++) {
    let result = "";
    let added = false;
    const line = arrOfStrings[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      result += char;
      if (!added && !isNaN(char) && line[j + 1] === ")") {
        onlyRelevantNumsAsStrings.push(result);
        added = true;
      }
      if (char == "d") {
        let s = line.slice(j, j + 4);
        if (s == doString) {
          dosAndDonts.push("do");
        }
        s = line.slice(j, j + 7);
        if (s == dontString) {
          dosAndDonts.push("dont");
        }
      }
    }

    if (dosAndDonts.length > 0) {
      onlyRelevantNumsAsStrings.push(dosAndDonts[dosAndDonts.length - 1]);

      dosAndDonts = [];
    }
  }
  return onlyRelevantNumsAsStrings;
};

const parseInputForPartTwo = (input) => {
  const splitAllMulStrings = input[0].split("mul(");
  const getNumbersAndInstructionsStrings = getOnlyNumbersAndStrings(splitAllMulStrings);
  let arr = [];
  for (let i = 0; i < getNumbersAndInstructionsStrings.length; i++) {
    let isDo = false;
    const temp = getNumbersAndInstructionsStrings[i]
      .split(",")
      .map((i) => {
        if (!isNaN(Number(i))) {
          return Number(i);
        } else if (i == "do" || i == "dont") {
          isDo = true;
          return i;
        }
      })
      .filter((elm) => elm);
    if (temp.length == 2 || isDo) {
      arr.push(temp);
    }
  }
  return arr.flat();
};

const solvePartTwo = (numArray) => {
  let count = 0;
  let continueToCount = true;
  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] == "dont") {
      continueToCount = false;
      continue;
    } else if (numArray[i] == "do") {
      continueToCount = true;
      continue;
    }
    if (continueToCount && !isNaN(numArray[i]) && !isNaN(numArray[i + 1])) {
      console.log(numArray[i], numArray[i + 1]);
      count += numArray[i] * numArray[i + 1];
      i++;
    }
  }
  return count;
};

const solveDayThree = (input) => {
  const getInputAsNumArray = parseInput(input);
  const partOne = solvePartOne(getInputAsNumArray);
  const getPartTwoInput = parseInputForPartTwo(input);
  const partTwo = solvePartTwo(getPartTwoInput);
  console.table(getPartTwoInput);
  return partTwo;
};

console.log(solveDayThree(input));
