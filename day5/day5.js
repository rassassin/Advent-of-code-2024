const fs = require("fs");
const input = fs.readFileSync("./day5input.txt", "utf-8").split("\n");

function parseLine(line, delimiter) {
  return line.split(delimiter).map((v) => parseInt(v));
}

function parseInput(input) {
  const rules = {};
  let lineBreak = -1;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if (!line.length) {
      lineBreak = i + 1;
      break;
    }
    const [a, b] = parseLine(line, "|");
    if (rules[b] === undefined) rules[b] = [];
    rules[b].push(a);
  }
  const pages = [];
  for (let i = lineBreak; i < input.length; i++) {
    pages.push(parseLine(input[i], ","));
  }
  return { rules, pages };
}

function getMiddleNum(arr) {
  const middleIdx = Math.floor(arr.length / 2);
  return arr[middleIdx];
}

function solvePartOne(parsedInput) {
  const incorrectLines = [];
  let partOne = 0;
  outer: for (const line of parsedInput.pages) {
    for (let i = 0; i < line.length - 1; i++) {
      const num = line[i];
      if (parsedInput.rules[num] != undefined) {
        const slice = line.slice(i + 1);
        for (const ruleNum of parsedInput.rules[num]) {
          if (slice.includes(ruleNum)) {
            incorrectLines.push(line);
            continue outer;
          }
        }
      }
    }
    partOne += getMiddleNum(line);
  }
  return { partOne, incorrectLines };
}

const solvePartTwo = (rules, incorrectLines) => {
  let result = 0;
  for (let l = 0; l < incorrectLines.length; l++) {
    let swapped = true;
    while (swapped) {
      swapped = false;
      const line = incorrectLines[l];
      for (let i = 0; i < line.length - 1; i++) {
        const num = line[i];
        if (rules[num] != undefined) {
          const slice = line.slice(i + 1);
          for (let j = 0; j < rules[num].length; j++) {
            const ruleNum = rules[num][j];
            if (slice.includes(ruleNum)) {
              [line[i], line[j]] = [line[j], line[i]];
              swapped = true;
              incorrectLines[l] = line;
            }
          }
        }
      }
    }
    result += getMiddleNum(line);
  }
  return result;
};

function solveDayFive(input) {
  const parsedInput = parseInput(input);
  const { partOne, incorrectLines } = solvePartOne(parsedInput);
  const partTwo = solvePartTwo(parsedInput.rules, incorrectLines);
  return { partOne, partTwo };
}

console.log(solveDayFive(input));
