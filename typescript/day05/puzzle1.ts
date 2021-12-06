type Matrix = {
    [key: string]: number | undefined;
};

function walkPoints(
    a: number[],
    b: number[],
    callback: (point: number[]) => void
) {
    const index = a[0] === b[0] ? 1 : 0;
    const delta = b[index] > a[index] ? 1 : -1;
    const start = delta === 1 ? a : b;
    const end = delta === 1 ? b : a;

    for (let i = start[index]; i <= end[index]; i += 1) {
        const point = [...start];
        point[index] = i;

        callback(point);
    }
}

async function puzzle1(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const m = text
        .split(/\n/)
        .map((line) => {
            return line.split(' -> ').map((part) => {
                return part.split(',').map((n) => parseInt(n, 10));
            });
        })
        .filter(([start, end]) => start[0] === end[0] || start[1] === end[1])
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

console.log(await puzzle1('input1'));
