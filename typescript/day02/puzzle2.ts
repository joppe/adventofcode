function getAim(direction: string, amount: number): number {
    if (direction === 'down') {
        return amount;
    }

    if (direction === 'up') {
        return -amount;
    }

    return 0;
}

async function puzzle2(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const result = text.split(/\n/).reduce(
        (total, line) => {
            const [direction, number] = line.split(/\s+/);
            const amount = parseInt(number, 10);
            const aim = getAim(direction, amount) + total.aim;

            if (direction === 'forward') {
                return {
                    aim,
                    horizontal: total.horizontal + amount,
                    depth: total.depth + amount * total.aim,
                };
            }

            return {
                ...total,
                aim,
            };
        },
        {
            aim: 0,
            depth: 0,
            horizontal: 0,
        }
    );

    return result.depth * result.horizontal;
}

console.log(await puzzle2('input2'));
