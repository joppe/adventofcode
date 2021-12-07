const DAYS_DOUBLE = 7;

function perFish(age: number, days: number): number {
    let count = 1;
    let rest = days - age;

    while (rest > 0) {
        count += perFish(9, rest);
        rest -= DAYS_DOUBLE;
    }

    return count;
}

function timelapse(fishes: number[], days: number): number {
    const cache: number[] = [0];
    const start = Date.now();

    for (let i = 1; i <= 6; i += 1) {
        cache[i] = perFish(i, days);
        console.log(i, Date.now() - start);
    }

    return fishes.reduce((total, fish) => {
        return total + cache[fish];
    }, 0);
}

async function puzzle2(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const fishes = text.split(',').map((part) => parseInt(part, 10));
    const days = 256;

    return timelapse(fishes, days);
}

console.log('result:', await puzzle2('input1'));
