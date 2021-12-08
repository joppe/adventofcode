async function getLines(filePath: string): Promise<string[]> {
    const text = await Deno.readTextFile(filePath);

    return text.split(/\n/);
}

function toInt(str: string): number {
    return parseInt(str, 10);
}

function square(nmbr: number): number {
    return nmbr * nmbr;
}

function averagePosition(positions: number[]): number {
    return (
        positions.reduce((total, position) => total + position) /
        positions.length
    );
}

function standardDeviation(positions: number[], average: number): number {
    const means = positions.map((position) => square(position - average));

    return Math.sqrt(averagePosition(means));
}

function range(start: number, end: number): number[] {
    const r = [];

    for (let i = start; i <= end; i += 1) {
        r.push(i);
    }

    return r;
}

function positionRange(positions: number[]): number[] {
    const average = averagePosition(positions);
    const half = standardDeviation(positions, average) / 2;

    return range(Math.round(average - half), Math.round(average + half));
}

function calculateFuel(positions: number[], targetPosition: number): number {
    return positions.reduce(
        (total, position) => total + Math.abs(position - targetPosition),
        0
    );
}

async function puzzle1(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;

    const lines = await getLines(filePath);
    const positions = lines[0].split(',').map(toInt);

    return positionRange(positions).reduce((total, targetPosition) => {
        const fuel = calculateFuel(positions, targetPosition);

        if (total === -1 || fuel < total) {
            return fuel;
        }

        return total;
    }, -1);
}

console.log(await puzzle1());
