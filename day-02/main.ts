type Rule = {
    char: string;
    min: number;
    max: number;
};

type Line = {
    password: string;
    rule: Rule;
};

function getEntry(line: string): Line {
    const [rest, password] = line.split(':');
    const [minMax, char] = rest.split(' ');
    const [min, max] = minMax.split('-');

    return {
        password: password.trim(),
        rule: {
            char: char.trim(),
            min: parseInt(min, 10),
            max: parseInt(max, 10),
        },
    };
}

async function getInput(): Promise<Line[]> {
    const text = await Deno.readTextFile('./input.txt');

    return text
        .split(/\n/)
        .filter((line) => line !== '')
        .map(getEntry);
}

function isValid(password: string, rule: Rule) {
    const re = new RegExp(rule.char, 'g');
    const matches = password.match(re);
    const count = matches === null ? 0 : matches.length;

    return count >= rule.min && count <= rule.max;
}

function isValidPosition(password: string, rule: Rule) {
    let count = 0;

    if (password.charAt(rule.min - 1) === rule.char) {
        count += 1;
    }
    if (password.charAt(rule.max - 1) === rule.char) {
        count += 1;
    }

    return count === 1;
}

(async () => {
    const input = await getInput();
    const result = input.reduce((acc: string[], line: Line): string[] => {
        if (isValidPosition(line.password, line.rule)) {
            return [...acc, line.password];
        }

        return acc;
    }, []);

    console.log('Valid passwords ', result.length);
})();

export {};
