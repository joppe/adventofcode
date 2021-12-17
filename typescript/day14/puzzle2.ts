import { getLines, toInt } from '../util/util.ts';

type Registry = {
    [pattern: string]: string;
};

type Counter = {
    [char: string]: number;
};

async function puzzle2(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);

    const start = lines.shift() as string;

    lines.shift();

    const registry = lines.reduce((all: Registry, line) => {
        const [pattern, char] = line.split(' -> ');

        all[pattern] = char;

        return all;
    }, {});

    let entries: Counter = {};
    const counter: Counter = {};

    function count(char: string, increment = 1) {
        if (counter[char] === undefined) {
            counter[char] = 0;
        }

        counter[char] += increment;
    }

    start.split('').forEach((char) => count(char));

    for (let i = 0; i < start.length - 1; i += 1) {
        const sub = start.substr(i, 2);

        if (entries[sub] === undefined) {
            entries[sub] = 0;
        }

        entries[sub] += 1;
    }

    const steps = 40;

    for (let step = 1; step <= steps; step += 1) {
        entries = Object.keys(entries).reduce((all: Counter, sub) => {
            if (registry[sub] === undefined) {
                return all;
            }

            const increment = entries[sub];
            const char = registry[sub];
            const [a, b] = sub;
            const aa = `${a}${char}`;
            const bb = `${char}${b}`;

            if (all[aa] === undefined) {
                all[aa] = 0;
            }

            all[aa] += increment;

            if (all[bb] === undefined) {
                all[bb] = 0;
            }

            all[bb] += increment;

            count(char, increment);

            return all;
        }, {});
    }

    let min = Infinity;
    let max = -Infinity;

    Object.keys(counter).forEach((char) => {
        const value = counter[char];

        if (value > max) {
            max = value;
        }

        if (value < min) {
            min = value;
        }
    });

    return max - min;
}

console.log('result', await puzzle2(false));
