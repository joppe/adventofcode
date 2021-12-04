function getBit(value: number, half: number): number {
    return value > half ? 1 : 0;
}

async function puzzle1(fileName: string): Promise<any> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    const lines = text.split(/\n/);

    const gammaStr = lines
        .reduce((total: number[], line: string): number[] => {
            return line
                .split('')
                .map(
                    (digit, index) =>
                        parseInt(digit, 10) + (total[index] ? total[index] : 0)
                );
        }, [])
        .reduce((total, part) => {
            const half = lines.length / 2;

            return `${total}${part > half ? '1' : '0'}`;
        }, '');

    const epsilonStr = gammaStr.split('').reduce((total, part) => {
        return `${total}${part === '1' ? '0' : '1'}`;
    }, '');

    const gamma = parseInt(gammaStr, 2);
    const epsilon = parseInt(epsilonStr, 2);

    return gamma * epsilon;
}

console.log(await puzzle1('input1'));
