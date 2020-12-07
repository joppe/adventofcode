type Color = {
    name: string;
    children: Child[];
};

type Child = {
    name: string;
    count: number;
};

function asChild(colorName: string, colors: Color[]) {
    const parents = colors
        .filter((color) => {
            return color.children.find((child) => {
                return child.name === colorName;
            });
        })
        .map((color) => {
            return color.name;
        });

    return parents.reduce((acc: string[], parent: string): string[] => {
        const children = asChild(parent, colors).filter((child) => {
            return !acc.includes(child);
        });

        return [...acc, ...children];
    }, parents);
}
/**
 * 1 shiny gold
 * - 1 dark olive
 *      - 3 faded blue
 *      - 4 dotted black
 * - 2 vibrant plum
 *      - 5 faded blue
 *      - 6 dotted black
 */

function counter(colorName: string, colors: Color[]): number {
    const color = colors.find((c) => {
        return c.name === colorName;
    });

    if (color === undefined) {
        return 0;
    }

    return color.children.reduce((acc, child) => {
        return acc + child.count + child.count * counter(child.name, colors);
    }, 0);
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const colors: Color[] = text.split(/\n/).map((line) => {
        const words = line.split(' ');
        const children = words
            .slice(4)
            .join(' ')
            .split(',')
            .filter((line) => {
                return line !== 'no other bags.';
            })
            .map((line) => {
                const words = line.trim().split(' ');

                return {
                    name: words.slice(1, 3).join(' '),
                    count: parseInt(words[0]),
                };
            });

        return {
            name: words.slice(0, 2).join(' '),
            children,
        };
    });

    console.log(colors);
    console.log('count', asChild('shiny gold', colors).length);
    console.log('total', counter('shiny gold', colors));
})();

export {};
