import { getLines, toInt } from '../util/util.ts';

type Coordinate = {
    x: number;
    y: number;
};

type Heights = number[][];

function containsCoordinate(
    coordinate: Coordinate,
    coordinates: Coordinate[]
): boolean {
    const result =
        coordinates.find(
            (c) => c.x === coordinate.x && c.y === coordinate.y
        ) !== undefined;

    // console.log('*************');
    // console.log('containsCoordinate', result);
    // console.log('coordinate', coordinate);
    // console.log('coordinates', coordinates);

    return result;
}

function isGoodNeighbour(
    coordinate: Coordinate,
    heights: number[][],
    exclude: Coordinate[] = []
): boolean {
    const height = heights[coordinate.y]?.[coordinate.x];

    return (
        height !== undefined &&
        height < 9 &&
        !containsCoordinate(coordinate, exclude)
    );
}

function findNeighbours(
    coordinate: Coordinate,
    heights: Heights,
    exclude: Coordinate[]
) {
    const neighbours = [];
    const offsets = [-1, 1];

    for (const yOffset of offsets) {
        const neighbour = {
            x: coordinate.x,
            y: coordinate.y + yOffset,
        };

        if (isGoodNeighbour(neighbour, heights, exclude)) {
            neighbours.push(neighbour);
        }
    }

    for (const xOffset of offsets) {
        const neighbour = {
            x: coordinate.x + xOffset,
            y: coordinate.y,
        };

        if (isGoodNeighbour(neighbour, heights, exclude)) {
            neighbours.push(neighbour);
        }
    }

    return neighbours;
}

function findLowest(heights: Heights): Coordinate[] {
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
                lowest.push({ x, y });
            }
        }
    }

    return lowest;
}

function findAllNeighbours(
    coordinate: Coordinate,
    heights: Heights,
    found: Coordinate[]
): Coordinate[] {
    const neighbours = findNeighbours(coordinate, heights, found);
    const allFound = found.concat(...neighbours);

    return neighbours.reduce((all, neighbour) => {
        const result = findAllNeighbours(neighbour, heights, allFound);

        allFound.push(...result);

        return all.concat(...result);
    }, neighbours);
}

function findBasin(
    coordinate: Coordinate,
    heights: Heights,
    basin: Coordinate[]
): Coordinate[] {
    return [coordinate].concat(
        ...findAllNeighbours(coordinate, heights, basin)
    );
}

async function puzzle2(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const heights = lines.map((line) => line.split('').map(toInt));
    const lowest = findLowest(heights);

    findBasin(lowest[1], heights, [lowest[1]]);

    const basins = lowest.map((low) => findBasin(low, heights, [low]));
    const lengths = basins.map((basin) => basin.length);

    lengths.sort((a, b) => (a > b ? -1 : 1));

    const rest = lengths.slice(0, 3);

    console.log('basins', basins);
    console.log('basins lengths', lengths);
    console.log('basins rest', rest);

    return rest.reduce((total, length) => total * length);
}

console.log('result', await puzzle2(false));
