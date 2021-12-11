import { getLines, toInt } from '../util/util.ts';

async function puzzle2(isTestRun = false): Promise<void> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);

    const octopuses = lines.map((line) => line.split('').map(toInt));
    const horizontal = octopuses[0].length;
    const vertical = octopuses.length;
    const count = horizontal * vertical;
    const total = 2000;

    let flashes = 0;
    let steps = total;

    function flash(x: number, y: number): void {
        flashes += 1;

        for (let yOffset = -1; yOffset <= 1; yOffset += 1) {
            for (let xOffset = -1; xOffset <= 1; xOffset += 1) {
                const newX = x + xOffset;
                const newY = y + yOffset;

                if (
                    octopuses[newY]?.[newX] === undefined ||
                    (xOffset === 0 && yOffset === 0)
                ) {
                    continue;
                }

                const energy = octopuses[newY][newX] + 1;

                octopuses[newY][newX] = energy;

                if (energy === 10) {
                    flash(newX, newY);
                }
            }
        }
    }

    while (steps > 0) {
        steps -= 1;

        for (let y = 0; y < vertical; y += 1) {
            for (let x = 0; x < horizontal; x += 1) {
                const energy = octopuses[y][x] + 1;

                octopuses[y][x] = energy;

                if (energy === 10) {
                    flash(x, y);
                }
            }
        }

        let zeros = 0;

        for (let y = 0; y < vertical; y += 1) {
            for (let x = 0; x < horizontal; x += 1) {
                if (octopuses[y][x] > 9) {
                    zeros += 1;

                    octopuses[y][x] = 0;
                }
            }
        }

        if (zeros === count) {
            console.log(steps);
            console.log(total - steps);
            return;
        }
    }

    console.log('flashes', flashes);
}

console.log('result', await puzzle2(false));
