function timelapse(fishes: number[], days: number): number {
    while (days > 0) {
        const newFish: number[] = [];

        fishes = fishes.map((fish) => {
            if (fish === 0) {
                newFish.push(8);
                return 6;
            }

            return fish - 1;
        });

        fishes.push(...newFish);
        console.log(...fishes);
        days -= 1;
    }

    return fishes.length;
}

async function puzzle1(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const fishes = text.split(',').map((part) => parseInt(part, 10));

    return timelapse([3], 18);
}

console.log(await puzzle1('ref1'));
