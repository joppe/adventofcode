import { getLines, toInt } from '../util/util.ts';

type Position = {
    x: number;
    y: number;
};

type Visited = {
    [key: string]: number;
};

function incrementValue(value: number, increment: number): number {
    const newValue = value + increment;

    if (newValue <= 9) {
        return newValue;
    }

    return newValue - 9;
}

function getBigMap(lines: string[]): number[][] {
    const baseMap = lines.map((line) => {
        const initial = line.split('').map(toInt);
        const result = [...initial];

        for (let xOffset = 1; xOffset < 5; xOffset += 1) {
            initial.forEach((n) => result.push(incrementValue(n, xOffset)));
        }

        return result;
    });
    const map: number[][] = [...baseMap];

    for (let yOffset = 1; yOffset < 5; yOffset += 1) {
        baseMap.forEach((line) => {
            map.push(line.map((n) => incrementValue(n, yOffset)));
        });
    }

    return map;
}

function getMap(lines: string[]): number[][] {
    return lines.map((line) => line.split('').map(toInt));
}

async function puzzle(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const map = getBigMap(lines);

    const start = { x: 0, y: 0 };
    const end = { x: map[map.length - 1].length - 1, y: map.length - 1 };
    const visited: Visited = {};
    let lowestRisk = Infinity;

    function getKey(position: Position): string {
        return `${position.x}-${position.y}`;
    }

    function getRisk(position: Position): number {
        if (map[position.y][position.x] === undefined) {
            return Infinity;
        }

        return map[position.y][position.x];
    }

    function getNeighbours(position: Position): Position[] {
        const neighbours = [];

        if (position.x + 1 < map[0].length) {
            neighbours.push({ ...position, x: position.x + 1 });
        }

        if (position.x - 1 >= 0) {
            neighbours.push({ ...position, x: position.x - 1 });
        }

        if (position.y + 1 < map.length) {
            neighbours.push({ ...position, y: position.y + 1 });
        }

        if (position.y - 1 >= 0) {
            neighbours.push({ ...position, y: position.y - 1 });
        }

        return neighbours;
    }

    function isEnd(position: Position): boolean {
        return end.x === position.x && end.y === position.y;
    }

    // depth first
    function dfs(position: Position, risk: number) {
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

                dfs(neighbour, newRisk);
            }
        }
    }

    type QueueEntry = {
        position: Position;
        risk: number;
    };

    // breadth first
    function bfs(start: Position) {
        const queue = (() => {
            const q: QueueEntry[] = [];

            return {
                shift() {
                    return q.shift();
                },
                push(position: Position, risk: number) {
                    q.push({ position, risk });
                    q.sort((a, b) => (a.risk < b.risk ? -1 : 1));
                },
                get length() {
                    return q.length;
                },
            };
        })();
        queue.push(start, 0);

        while (queue.length) {
            const current = queue.shift() as QueueEntry;
            const risk = current.risk;

            if (isEnd(current.position)) {
                if (risk < lowestRisk) {
                    lowestRisk = risk;
                }
            }

            const neighbours = getNeighbours(current.position);

            for (const neighbour of neighbours) {
                const newRisk = risk + getRisk(neighbour);
                const otherRisk = visited[getKey(neighbour)] ?? Infinity;

                if (newRisk >= lowestRisk || newRisk >= otherRisk) {
                    continue;
                }

                visited[getKey(neighbour)] = newRisk;

                queue.push(neighbour, newRisk);
            }
        }
    }

    visited[getKey(start)] = 0;

    bfs(start);

    // console.log(end);

    // for (let i = 0; i < map.length; i += 1) {
    //     console.log(map[i].join(''));
    // }

    // console.log('--------------------------');

    // const temp = Object.keys(visited).reduce((grid: number[][], key) => {
    //     const [x, y] = key.split('-').map(toInt);

    //     if (grid[y] === undefined) {
    //         grid[y] = [];
    //     }

    //     grid[y][x] = visited[key];

    //     return grid;
    // }, []);

    // for (let i = 0; i < temp.length; i += 1) {
    //     console.log(temp[i].map((n) => `  ${n}`.slice(-3)).join(' - '));
    // }

    return lowestRisk;
}

console.log('result', await puzzle(false));
