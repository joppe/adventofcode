import { getLines, toInt } from '../util/util.ts';

type Registry = {
    [pattern: string]: string;
};

type Counter = {
    [char: string]: number;
};

async function puzzle1(isTestRun = false): Promise<number> {
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

    function replace(target: string): string {
        let result = '';

        for (let i = 0; i < target.length - 1; i += 1) {
            const sub = target.substr(i, 2);

            if (registry[sub] === undefined) {
                result += target[i];
            } else {
                result += target[i] + registry[sub];
            }
        }

        result += target[target.length - 1];

        return result;
    }

    const steps = 10;
    let result = start;

    for (let step = 1; step <= steps; step += 1) {
        result = replace(result);
    }

    const count = result.split('').reduce((counter: Counter, char) => {
        if (counter[char] === undefined) {
            counter[char] = 0;
        }

        counter[char] += 1;

        return counter;
    }, {});

    let min = Infinity;
    let max = -Infinity;

    Object.keys(count).forEach((char) => {
        const value = count[char];

        if (value > max) {
            max = value;
        }

        if (value < min) {
            min = value;
        }
    });

    return max - min;
}

console.log('result', await puzzle1(true));
