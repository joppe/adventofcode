import { getLines, toInt } from '../util/util.ts';

async function puzzle1(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const heights = lines.map((line) => line.split('').map(toInt));

    const lowest = [];

    for (let y = 0; y < heights.length; y += 1) {
        for (let x = 0; x < heights[y].length; x += 1) {
            const height = heights[y][x];
            const left = heights[y]?.[x - 1] ?? Infinity;
            const right = heights[y]?.[x + 1] ?? Infinity;
            const top = heights[y - 1]?.[x] ?? Infinity;
            const bottom = heights[y + 1]?.[x] ?? Infinity;

            if (
                height < left &&
                height < right &&
                height < top &&
                height < bottom
            ) {
                console.log({ x, y });
                lowest.push(height);
            }
        }
    }

    console.log(lowest);

    return lowest.length + lowest.reduce((total, low) => total + low);
}

console.log(await puzzle1(true));
