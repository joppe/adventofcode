/**
 * Output joltage
 *
 * adapter 1,2 or 3 jolts lower than rating
 */

type Deltas = {
    [key: string]: number;
};

type Chain = {
    [key: string]: number;
};

function getAdapters(
    input: number,
    maxDelta: number,
    ratings: number[]
): number[] {
    return ratings.filter((rating) => {
        return rating > input && rating <= input + maxDelta;
    });
}

function connect(maxDelta: number, ratings: number[]): Deltas {
    let n = ratings.length;
    let jolts = 0;
    const deltas: Deltas = {};

    while (n > 0) {
        const possiblities = getAdapters(jolts, maxDelta, ratings);
        const diff = possiblities[0] - jolts;

        jolts += diff;

        if (deltas[diff] === undefined) {
            deltas[diff] = 0;
        }

        deltas[diff] += 1;
        n -= 1;
    }

    return deltas;
}

function solveNaive(
    start: number,
    end: number,
    maxDelta: number,
    ratings: number[]
): number {
    const possiblities = getAdapters(start, maxDelta, ratings);

    if (possiblities.length === 0) {
        return 0;
    }

    return possiblities.reduce((acc: number, possiblity): number => {
        if (possiblity + maxDelta >= end) {
            return acc + 1;
        }

        return acc + solveNaive(possiblity, end, maxDelta, ratings);
    }, 0);
}

function solve(maxDelta: number, ratings: number[]): number {
    // this is the longest chain, every other chain is shorter and has overlap with this chain, the number indicate how often each node is used in a solution
    const chain: Chain = ratings.reduce((acc, rating) => {
        return {
            ...acc,
            [rating]: 1,
        };
    }, {});

    // begin from the end
    for (let index = ratings.length - 1; index >= 0; index -= 1) {
        const target = ratings[index];
        const possiblities = getAdapters(target, maxDelta, ratings);
        const count = possiblities.reduce((acc, possibility) => {
            return acc + chain[possibility];
        }, 0);

        if (count > 0) {
            chain[target] = count;
        }
    }

    return chain['0'];
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const ratings = text
        .split(/\n/)
        .map((line) => parseInt(line, 10))
        .sort((a, b) => {
            return a < b ? -1 : 1;
        });

    const start = Date.now();
    const myDeviceRating = Math.max(...ratings) + 3;
    // ratings.forEach((rating) => console.log(rating));
    // const result = connect(3, ratings.concat(myDeviceRating));
    console.log('my device', myDeviceRating);
    // console.log(result, result['1'] + result['3']);
    // console.log('result', result['1'] * result['3']);
    // console.log('naive', solveNaive(0, myDeviceRating, 3, ratings));
    console.log('solve', solve(3, [0, ...ratings]));
    const end = Date.now();

    console.log('time', end - start);
})();

export {};
