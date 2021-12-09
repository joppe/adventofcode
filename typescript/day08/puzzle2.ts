import { getLines } from '../util/util.ts';

function find(digits: string[], length: number): string {
    return digits.find((digit) => digit.length === length) as string;
}

function findAll(digits: string[], length: number): string[] {
    return digits.filter((digit) => digit.length === length);
}

function findOne(digits: string[]) {
    return find(digits, 2);
}

function findFour(digits: string[]) {
    return find(digits, 4);
}

function findSeven(digits: string[]) {
    return find(digits, 3);
}

function findEight(digits: string[]) {
    return find(digits, 7);
}

function remainder(a: string, b: string): string {
    const looper = a.length > b.length ? a : b;
    const lookup = a.length > b.length ? b : a;

    return looper
        .split('')
        .reduce(
            (total, char) => {
                if (lookup.includes(char)) {
                    return total;
                }

                return total.concat(char);
            },
            ['']
        )
        .join('');
}

function contains(a: string, b: string): boolean {
    const looper = a.length < b.length ? a : b;
    const lookup = a.length < b.length ? b : a;

    return looper.split('').every((char) => {
        return lookup.includes(char);
    });
}

function findSix(zeroSixNine: string[], one: string): string {
    return zeroSixNine.find((digit) => {
        return !contains(digit, one);
    }) as string;
}

function findNine(zeroSixNine: string[], six: string, four: string): string {
    return zeroSixNine.find((digit) => {
        return six !== digit && contains(digit, four);
    }) as string;
}

function findZero(zeroSixNine: string[], sixNine: string[]): string {
    return zeroSixNine.find((digit) => {
        return !sixNine.includes(digit);
    }) as string;
}

function findTwo(twoThreeFive: string[], segment: string): string {
    return twoThreeFive.find((digit) => {
        return digit.includes(segment);
    }) as string;
}

function findThree(twoThreeFive: string[], one: string): string {
    return twoThreeFive.find((digit) => {
        return contains(digit, one);
    }) as string;
}

function findFive(twoThreeFive: string[], twoThree: string[]): string {
    return twoThreeFive.find((digit) => {
        return !twoThree.includes(digit);
    }) as string;
}

function findMapping(digits: string[]): Map<number, string> {
    const map = new Map();
    const segments = new Map();

    map.set(1, findOne(digits));
    map.set(4, findFour(digits));
    map.set(7, findSeven(digits));
    map.set(8, findEight(digits));

    const zeroSixNine = findAll(digits, 6);
    map.set(6, findSix(zeroSixNine, map.get(1)));
    map.set(9, findNine(zeroSixNine, map.get(6), map.get(4)));
    map.set(0, findZero(zeroSixNine, [map.get(6), map.get(9)]));

    segments.set(0, remainder(map.get(1), map.get(7)));
    segments.set(4, remainder(map.get(8), map.get(9)));

    const twoThreeFive = findAll(digits, 5);
    map.set(3, findThree(twoThreeFive, map.get(1)));
    map.set(2, findTwo(twoThreeFive, segments.get(4)));
    map.set(5, findFive(twoThreeFive, [map.get(2), map.get(3)]));

    return map;
}

function isSame(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return a.split('').every((char) => b.includes(char));
}

function findNumber(digit: string, map: Map<number, string>): number {
    const arr = Array.from(map);
    const result = arr.find((item) => isSame(item[1], digit)) as [
        number,
        string
    ];

    return result[0];
}

async function puzzle2(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const configs = lines.map((line) => {
        return line.split(' | ').map((part) => {
            return part.split(/\s+/);
        });
    });
    return configs.reduce((total, config) => {
        const mapping = findMapping(config[0]);
        const subtotal = config[1]
            .map((digit) => String(findNumber(digit, mapping)))
            .join('');

        return total + parseInt(subtotal, 10);
    }, 0);
}

console.log(await puzzle2(false));
