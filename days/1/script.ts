import fs from "fs";

const input = fs.readFileSync("./days/1/input.txt", "utf8");
const inputArray = input.split("\n");

let weightPerElf = [];

let summedWeight: number = 0;

for (let weight of inputArray) {
    if (weight.length > 0) {
        summedWeight += parseInt(weight);
    } else {
        weightPerElf.push(summedWeight);
        summedWeight = 0;
    }
}

const sortedWeights = weightPerElf.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
});

console.log("file: script.ts:21 : sortedWeights", sortedWeights);

const answer = sortedWeights[0] + sortedWeights[1] + sortedWeights[2];

console.log("file: script.ts:22 : answer", answer);
