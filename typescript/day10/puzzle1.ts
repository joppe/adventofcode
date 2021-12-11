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
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
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

async function puzzle1(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);

    return lines
        .map((line) => checkLine(line))
        .reduce((total, char) => {
            if (char === undefined) {
                return total;
            }

            return total + POINTS[char];
        }, 0);
}

console.log('result', await puzzle1(false));
