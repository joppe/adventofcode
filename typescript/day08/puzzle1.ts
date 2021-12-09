import { getLines } from '../util/util.ts';

async function puzzle1(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const configs = lines.map((line) => {
        return line.split(' | ').map((part) => {
            return part.split(/\s+/);
        });
    });
    const lengths = [2, 3, 4, 7];

    return configs.reduce((total, config) => {
        const subtotal = config[1].reduce((count, digit) => {
            if (lengths.includes(digit.length)) {
                return count + 1;
            }

            return count;
        }, 0);

        return total + subtotal;
    }, 0);
}

console.log(await puzzle1(false));
