function find(lines: string[], bit: (count: number, length: number) => string) {
    return lines[0].split('').reduce((rest, _, index) => {
        if (rest.length === 1) {
            return rest;
        }

        const count = rest.reduce((total, line) => {
            if (line.charAt(index) === '1') {
                return total + 1;
            }
            return total;
        }, 0);
        const b = bit(count, rest.length);

        return rest.filter((line) => line.charAt(index) === b);
    }, lines)[0];
}

async function puzzle2(fileName: string): Promise<any> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const lines = text.split(/\n/);
    const oxygen = find(lines, (count, length) =>
        count >= length / 2 ? '1' : '0'
    );
    const co2 = find(lines, (count, length) =>
        count >= length / 2 ? '0' : '1'
    );

    return parseInt(oxygen, 2) * parseInt(co2, 2);
}

console.log(await puzzle2('input2'));
