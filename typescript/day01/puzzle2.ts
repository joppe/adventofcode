async function puzzle2(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const result = text
        .split(/\n/)
        .map((line) => {
            const words = line.split(/\s+/);

            return parseInt(words[0]);
        })
        .reduce((threeMeasurements: number[], depth, index, depths) => {
            if (index < 2) {
                return threeMeasurements;
            }

            return threeMeasurements.concat(
                depths[index - 2] + depths[index - 1] + depths[index]
            );
        }, [])
        .reduce((total, depth, index, depths): number => {
            if (index === 0) {
                return total;
            }

            return depth > depths[index - 1] ? total + 1 : total;
        }, 0);

    console.log('result puzzle 2', result);

    return result;
}

puzzle2('input2');
