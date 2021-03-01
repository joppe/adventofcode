const OUT_OF_SERVICE = 'x';
const DEPART = 'D';
const EMPTY = '.';

function findDepartingBus(time: number, busses: number[]): number {
    for (const bus of busses) {
        if (time % bus === 0) {
            return bus;
        }
    }

    return -1;
}

function part1(lines: string[]) {
    const start = parseInt(lines[0], 10);
    const busses = lines[1]
        .split(',')
        .filter((column) => column !== OUT_OF_SERVICE)
        .map((column) => parseInt(column, 10));

    let time = start - 1;
    let bus;

    do {
        time += 1;
        bus = findDepartingBus(time, busses);
    } while (bus === -1);

    const waitingTime = time - start;

    return waitingTime * bus;
}

function part2(lines: string[], offset: number = 0) {
    const busses = lines[1]
        .split(',')
        .map((bus, index) => {
            return [index, parseInt(bus, 10)];
        })
        .filter((item) => {
            return !Number.isNaN(item[1]);
        })
        .sort((a, b) => {
            return a[1] > b[1] ? -1 : 1;
        });

    let time = offset - (offset % busses[0][1]) - busses[0][0];
    let found = false;

    do {
        time += busses[0][1];
        found = busses.every((bus) => {
            return (time + bus[0]) % bus[1] === 0;
        });
    } while (!found);

    return time;
}

function multiplyer(a: number, b: number, offset: number, start: number) {
    let count = Math.floor(start / a);
    let rest = -1;

    do {
        count += 1;
        rest = (a * count + offset) % b;
        console.log(a, b, count, rest);
    } while (rest !== 0);

    return count;
}

(async () => {
    //
    const text = await Deno.readTextFile('./input.txt');
    const lines = text.split(/\n/);
    const start = Date.now();
    // const result = part1(lines);
    const result = part2(lines, 100000000000000);
    const end = Date.now();
    console.log('duration (ms)', end - start);
    console.log('result', result);
    /**/
})();

export {};
