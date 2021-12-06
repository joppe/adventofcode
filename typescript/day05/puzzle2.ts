type Matrix = {
    [key: string]: number | undefined;
};

function isDiagonal(a: number[], b: number[]): boolean {
    return a[0] !== b[0] && a[1] !== b[1];
}
function isHorizontal(a: number[], b: number[]): boolean {
    return a[0] === b[0];
}

function getOffset(a: number, b: number): number {
    if (a < b) {
        return 1;
    }

    if (a > b) {
        return -1;
    }

    return 0;
}

function getSteps(a: number[], b: number[]): number {
    return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}

function walkPoints(
    a: number[],
    b: number[],
    callback: (point: number[]) => void
) {
    const index0Offset = getOffset(a[0], b[0]);
    const index1Offset = getOffset(a[1], b[1]);
    const point = [...a];
    let steps = getSteps(a, b);

    while (steps >= 0) {
        callback(point);

        point[0] += index0Offset;
        point[1] += index1Offset;

        steps -= 1;
    }
}

async function puzzle2(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const m = text
        .split(/\n/)
        .map((line) => {
            return line.split(' -> ').map((part) => {
                return part.split(',').map((n) => parseInt(n, 10));
            });
        })
        .reduce((matrix: Matrix, [a, b]) => {
            walkPoints(a, b, (point) => {
                const key = `${point[0]}-${point[1]}`;
                const value =
                    matrix[key] !== undefined ? (matrix[key] as number) : 0;

                matrix[key] = value + 1;
            });

            return matrix;
        }, {});

    return Object.values(m).filter((v) => v !== undefined && v >= 2).length;
}

console.log(await puzzle2('input2'));
