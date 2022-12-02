import fs from "fs";

type HandShape = "Rock" | "Paper" | "Scissors";

interface Points {
    [key: string]: number;
}

interface Column {
    [key: string]: HandShape;
}

const oponentHands: Column = {
    a: "Rock",
    b: "Paper",
    c: "Scissors",
};

const predictions = {
    x: "loss",
    y: "tie",
    z: "win",
};

const input = fs.readFileSync("./days/2/input.txt", "utf8");

const inputArray = input.split("\n");

const points: Points = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,

    loss: 0,
    tie: 3,
    win: 6,
};

const outcomePerHand = {
    "Rock Scissors": "loss",
    "Rock Paper": "win",
    "Rock Rock": "tie",

    "Paper Rock": "loss",
    "Paper Scissors": "win",
    "Paper Paper": "tie",

    "Scissors Paper": "loss",
    "Scissors Rock": "win",
    "Scissors Scissors": "tie",
};

const roundScore = (oponentHand: string, myHand: string): string => {
    let score = 0;

    score += points[myHand];

    const play = `${oponentHand} ${myHand}`;
    const result = points[outcomePerHand[play]];

    score += result;

    return score.toString();
};

const totalScore = inputArray
    .map((round) =>
        parseInt(
            round
                .toLowerCase()
                .split(" ")
                .reduce((a, b) => {
                    const getHandToPlay = (): string => {
                        const prediction = predictions[b];
                        const oponentHand = oponentHands[a];

                        if (prediction === "loss") {
                            if (oponentHand === "Rock") return "Scissors";
                            if (oponentHand === "Paper") return "Rock";
                            if (oponentHand === "Scissors") return "Paper";
                        }

                        if (prediction === "tie") {
                            return oponentHand;
                        }

                        if (prediction === "win") {
                            if (oponentHand === "Rock") return "Paper";
                            if (oponentHand === "Paper") return "Scissors";
                            if (oponentHand === "Scissors") return "Rock";
                        }

                        throw new Error("Couldn't find hand to play from prediction");
                    };

                    const myHand = getHandToPlay();

                    return roundScore(oponentHands[a], myHand);
                })
        )
    )
    .reduce((a, b) => a + b);

console.log(totalScore);
