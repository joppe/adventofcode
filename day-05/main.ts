const TOTAL_ROWS = 128;
const TOTAL_COLUMNS = 8;
const LOWER_ROW = 'F';
const LOWER_COLUMN = 'L';

type Range = {
    start: number;
    count: number;
};

type Position = {
    column: number;
    row: number;
};

function getIndex(parts: string[], lower: string, total: number) {
    const result = parts.reduce(
        (range: Range, part: string): Range => {
            const count = range.count / 2;
            const start = part === lower ? range.start : range.start + count;

            return { start, count };
        },
        {
            start: 0,
            count: total,
        }
    );

    return result.start;
}

function getPosition(pass: string): Position {
    const parts = pass.split('');

    return {
        row: getIndex(parts.slice(0, 7), LOWER_ROW, TOTAL_ROWS),
        column: getIndex(parts.slice(7), LOWER_COLUMN, TOTAL_COLUMNS),
    };
}

function getSeatId(row: number, column: number): number {
    return row * 8 + column;
}

function getSeatIds(passes: string[]): number[] {
    return passes.map((pass: string) => {
        const position = getPosition(pass);

        return getSeatId(position.row, position.column);
    });
}

function getHighest(passes: string[]): number {
    const ids = getSeatIds(passes);

    return Math.max(...ids);
}

function findSpot(passes: string[]) {
    const ids = getSeatIds(passes);
    let prev = 0;

    ids.sort();

    const next = ids.find((id) => {
        if (prev === 0) {
            prev = id;

            return false;
        }

        const result = prev + 1 !== id;

        prev = id;

        return result;
    });

    if (next === undefined) {
        throw new Error('Seat not found');
    }

    return next - 1;
}

async function getInput(file: string) {
    const text = await Deno.readTextFile(file);

    return text.split(/\n/);
}

(async () => {
    const input = await getInput('./input.txt');

    console.log('highest', getHighest(input));
    console.log('my seat', findSpot(input));
    // console.log(getHighest(['BFFFBBFRRR', 'FFFBBBFRRR', 'BBBFBBFRLL']));
})();

export {};
