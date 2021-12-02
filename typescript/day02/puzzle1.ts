async function puzzle1(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const result = text.split(/\n/).reduce(
        (total, line) => {
            const [direction, amount] = line.split(/\s+/);
            const property = direction === 'forward' ? 'horizontal' : 'depth';
            const multiplier = direction === 'up' ? -1 : 1;

            return {
                ...total,
                [property]: total[property] + multiplier * parseInt(amount, 10),
            };
        },
        {
            depth: 0,
            horizontal: 0,
        }
    );

    return result.depth * result.horizontal;
}

console.log(await puzzle1('input1'));
