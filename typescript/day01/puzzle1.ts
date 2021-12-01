async function puzzle1(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const result = text
        .split(/\n/)
        .map((depth) => parseInt(depth, 10))
        .reduce((total, depth, index, depths): number => {
            if (index === 0) {
                return total;
            }

            return depth > depths[index - 1] ? total + 1 : total;
        }, 0);

    console.log('result puzzle 1', result);

    return result;
}

puzzle1('input1');
