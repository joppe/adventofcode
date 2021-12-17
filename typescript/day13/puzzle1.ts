import { getLines, toInt } from '../util/util.ts';

type Position = {
    x: number;
    y: number;
};

type Grid = {
    [pos: string]: Position;
};

function createKey(x: number, y: number): string {
    return `${x}-${y}`;
}

function print(map: Grid, width: number, height: number) {
    let out = '';

    console.log(Object.keys(map));

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const key = createKey(x, y);

            // console.log(key);
            if (map[key] !== undefined) {
                out += '#';
            } else {
                out += ' ';
            }
        }
        out += '\n';
    }

    console.log(out);
}

async function puzzle1(isTestRun = false): Promise<void> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const grid: Grid = {};
    const folds = [];

    for (const line of lines) {
        if (line === '') {
            continue;
        }

        if (line.indexOf('fold') === 0) {
            const [axis, pos] = line.replace('fold along ', '').split('=');

            folds.push({
                [axis]: toInt(pos),
            });
        } else {
            const [x, y] = line.split(',').map(toInt);

            grid[createKey(x, y)] = { x, y };
        }
    }

    // console.log('grid', grid);
    // console.log('folds', folds);

    const result = folds.reduce((result: Grid, fold, index) => {
        const m: Grid = {};

        // console.log('fold', fold);
        Object.keys(result).forEach((key) => {
            let { x, y } = result[key];

            if (fold.x !== undefined && x > fold.x) {
                x = fold.x - (x - fold.x);
            }

            if (fold.y !== undefined && y > fold.y) {
                y = fold.y - (y - fold.y);
            }

            m[createKey(x, y)] = { x, y };
        });

        // print(m, 20, 20);

        console.log(`dots after ${index + 1} folds`, Object.keys(m).length);
        return m;
    }, grid);

    print(result, 200, 10);

    // console.log('result', Array.from(result));
}

console.log('result', await puzzle1(false));
