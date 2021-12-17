import { getLines, toInt } from '../util/util.ts';

type Position = {
    x: number;
    y: number;
};

type Visited = {
    [key: string]: number;
};

async function puzzle(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const map = lines.map((line) => line.split('').map(toInt));
    const start = { x: 0, y: 0 };
    const end = { x: map[map.length - 1].length - 1, y: map.length - 1 };
    const visited: Visited = {};
    let lowestRisk = Infinity;

    function getKey(position: Position): string {
        return `${position.x}-${position.y}`;
    }

    function getRisk(position: Position): number {
        return map[position.y][position.x];
    }

    function getNeighbours(position: Position): Position[] {
        const neighbours = [];

        if (position.x + 1 < map[0].length) {
            neighbours.push({ ...position, x: position.x + 1 });
        }

        if (position.y + 1 < map.length) {
            neighbours.push({ ...position, y: position.y + 1 });
        }

        return neighbours;
    }

    function isEnd(position: Position): boolean {
        return end.x === position.x && end.y === position.y;
    }

    function walk(position: Position, risk: number) {
        visited[getKey(position)] = risk;

        if (isEnd(position)) {
            if (risk < lowestRisk) {
                lowestRisk = risk;
            }
        } else {
            const neighbours = getNeighbours(position);

            for (const neighbour of neighbours) {
                const newRisk = risk + getRisk(neighbour);
                const otherRisk =
                    visited[getKey(neighbour)] !== undefined
                        ? visited[getKey(neighbour)]
                        : Infinity;

                if (newRisk >= lowestRisk || newRisk >= otherRisk) {
                    continue;
                }

                walk(neighbour, newRisk);
            }
        }
    }

    walk(start, 0);

    return lowestRisk;
}

console.log('result', await puzzle(false));
