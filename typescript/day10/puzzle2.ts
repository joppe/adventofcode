import { getLines, toInt } from '../util/util.ts';

const OPEN = '([{<';
const CLOSE = ')]}>';
const PAIR: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};
const POINTS: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

function checkLine(line: string): string | undefined {
    const chars = line.split('');
    const stack = [];

    for (const char of chars) {
        if (OPEN.includes(char)) {
            stack.push(PAIR[char]);
        } else if (char === stack[stack.length - 1]) {
            stack.pop();
        } else {
            return char;
        }
    }
}

function findMissingCharScore(line: string): number {
    const chars = line.split('');
    const stack = [];

    for (const char of chars) {
        if (OPEN.includes(char)) {
            stack.push(PAIR[char]);
        } else {
            stack.pop();
        }
    }

    return stack.reverse().reduce((total, char) => {
        return total * 5 + POINTS[char];
    }, 0);
}

async function puzzle2(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const scores = lines
        .filter((line) => checkLine(line) === undefined)
        .map(findMissingCharScore);
    const middle = Math.floor(scores.length / 2);

    scores.sort((a, b) => (a > b ? -1 : 1));

    console.log(scores);
    console.log(middle);

    return scores[middle];
}

console.log('result', await puzzle2(false));
