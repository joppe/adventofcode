function part1(text: string): string[][] {
    return text.split(/\n/).reduce(
        (acc: string[][], line: string): string[][] => {
            if (line === '') {
                return [...acc, []];
            }

            const rest = acc.slice(0, acc.length - 1);
            const current = line
                .split('')
                .reduce((parts: string[], q: string): string[] => {
                    if (parts.includes(q)) {
                        return parts;
                    }

                    return [...parts, q];
                }, acc[acc.length - 1]);

            return [...rest, current];
        },
        [[]]
    );
}

function part2(text: string): string[][] {
    const groups = text.split(/\n/).reduce(
        (acc: string[][][], line: string): string[][][] => {
            if (line === '') {
                return [...acc, []];
            }

            const rest = acc.slice(0, acc.length - 1);
            const current = acc[acc.length - 1];

            return [...rest, [...current, line.split('')]];
        },
        [[]]
    );

    return groups.map((group) => {
        return group.reduce((acc: string[], person: string[]): string[] => {
            return acc.filter((question) => {
                return person.includes(question);
            });
        });
    });
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const groups = part2(text);
    const count = groups.reduce((acc: number, group: string[]): number => {
        return acc + group.length;
    }, 0);

    console.log('groups', groups);
    console.log('count', count);
})();

export {};
