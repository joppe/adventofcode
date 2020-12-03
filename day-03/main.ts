type Movement = {
    x: number;
    y: number;
};

const SPACE = '.';
const TREE = '#';

async function getInput(file: string): Promise<string[][]> {
    const text = await Deno.readTextFile(file);

    return text
        .split(/\n/)
        .filter((line) => line !== '')
        .map((line) => line.split(''));
}

function walkToBottom(map: string[][], movement: Movement) {
    const position = { x: 0, y: 0 };
    const endX = map[0].length;
    const endY = map.length;
    const result = [];

    while (position.y < endY) {
        result.push(map[position.y][position.x % endX]);

        position.x += movement.x;
        position.y += movement.y;
    }

    return result;
}

function check(map: string[][]) {
    const endX = map[0].length;
    console.log(map[0][(endX + 1) % endX]);
}

function getTrees(path: string[]) {
    return path.filter((char) => char === TREE);
}

(async () => {
    // './input.txt'
    const input = await getInput('./input.txt');
    const movements = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ];
    const result = movements.reduce(
        (acc: number, movement: Movement): number => {
            const path = walkToBottom(input, movement);
            const trees = getTrees(path);

            return acc * trees.length;
        },
        1
    );

    console.log('count', result);
})();

export {};
