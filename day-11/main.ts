type Position = {
    x: number;
    y: number;
};

type OccupiedCounter = (position: Position, grid: string[][]) => number;

const FLOOR = '.';
const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const OFFSETS = [
    { x: -1, y: 0 }, // left
    { x: -1, y: 1 }, // left top
    { x: 0, y: 1 }, // top
    { x: 1, y: 1 }, // right top
    { x: 1, y: 0 }, // right
    { x: 1, y: -1 }, // right bottom
    { x: 0, y: -1 }, // bottom
    { x: -1, y: -1 }, // left bottom
];

function isValidPosition(position: Position, grid: string[][]): boolean {
    const validX = position.x >= 0 && position.x < grid[0].length;
    const validY = position.y >= 0 && position.y < grid.length;

    return validX && validY;
}

function adjacentSeats(position: Position, grid: string[][]): string[] {
    const seats = [];

    for (let row = -1; row <= 1; row += 1) {
        for (let column = -1; column <= 1; column += 1) {
            const target = {
                x: position.x + column,
                y: position.y + row,
            };
            const isSelf = target.x === position.x && target.y === position.y;

            if (isSelf || !isValidPosition(target, grid)) {
                continue;
            }

            seats.push(grid[target.y][target.x]);
        }
    }

    return seats;
}

function occupiedCount(grid: string[][]): number {
    const str = flatten(grid);
    const matches = str.match(new RegExp(OCCUPIED_SEAT, 'g'));

    if (matches === null) {
        return 0;
    }

    return matches.length;
}

function occupiedAxis(position: Position, offset: Position, grid: string[][]) {
    let place;
    let newPosition = { ...position };

    do {
        newPosition = {
            x: newPosition.x + offset.x,
            y: newPosition.y + offset.y,
        };

        if (!isValidPosition(newPosition, grid)) {
            break;
        }

        place = grid[newPosition.y][newPosition.x];
    } while (place === FLOOR);

    return place === OCCUPIED_SEAT;
}

function occupiedAroundCountExtended(
    position: Position,
    grid: string[][]
): number {
    return OFFSETS.reduce((acc, offset) => {
        if (occupiedAxis(position, offset, grid)) {
            return acc + 1;
        }

        return acc;
    }, 0);
}

function occupiedAroundCount(position: Position, grid: string[][]): number {
    return adjacentSeats(position, grid).filter(
        (seat) => seat === OCCUPIED_SEAT
    ).length;
}

function copy(grid: string[][]) {
    return grid.map((line) => line.slice(0));
}

function round(
    oldGrid: string[][],
    counter: OccupiedCounter,
    max: number
): string[][] {
    const grid = copy(oldGrid);

    for (let row = 0; row < grid.length; row += 1) {
        for (let column = 0; column < grid[0].length; column += 1) {
            const position = { x: column, y: row };

            if (oldGrid[row][column] === FLOOR) {
                continue;
            }

            const count = counter(position, oldGrid);

            if (count === 0) {
                grid[row][column] = OCCUPIED_SEAT;
            } else if (count >= max) {
                grid[row][column] = EMPTY_SEAT;
            }
        }
    }

    return grid;
}

function plot(grid: string[][]) {
    grid.forEach((line) => {
        console.log(line.join(''));
    });
}

function flatten(grid: string[][]): string {
    return grid.map((line) => line.join('')).join('');
}

function equal(a: string[][], b: string[][]) {
    return flatten(a) === flatten(b);
}

function loopUntilSame(
    grid: string[][],
    counter: OccupiedCounter,
    max: number
): string[][] {
    let count = 0;
    let oldGrid = grid;
    let isSame = false;

    do {
        const newGrid = round(oldGrid, counter, max);

        count += 1;
        isSame = equal(oldGrid, newGrid);
        oldGrid = newGrid;
    } while (!isSame);

    return oldGrid;
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const grid = text.split(/\n/).map((line) => line.split(''));

    // console.log(grid);
    // console.log(adjacentSeats({ x: 1, y: 1 }, grid));

    // const r1 = round(grid);
    // plot(r1);
    // console.log(' ');
    // const r2 = round(r1);
    // plot(r2);

    // console.log(flatten(r2));
    // const result = loopUntilSame(grid, occupiedAroundCount, 4);
    const result = loopUntilSame(grid, occupiedAroundCountExtended, 5);
    // const r1 = round(grid, occupiedAroundCountExtended, 5);
    // plot(r1);
    // console.log(' ');
    // const r2 = round(r1, occupiedAroundCountExtended, 5);
    // plot(r2);
    // occupiedAxis({ x: 0, y: 0 }, { x: 1, y: 0 }, grid);
    // console.log(occupiedAroundCountExtended({ x: 0, y: 0 }, grid));
    plot(result);
    console.log(occupiedCount(result));
})();

export {};
