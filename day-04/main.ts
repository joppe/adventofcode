type Passpord = {
    [key: string]: string;
};

const EXPECTED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const FIELD_RULES = {
    byr: (val: string) => {
        const min = 1920;
        const max = 2002;
        const v = parseInt(val, 10);

        return v >= min && v <= max;
    },
    iyr: (val: string) => {
        const min = 2010;
        const max = 2020;
        const v = parseInt(val, 10);

        return v >= min && v <= max;
    },
    eyr: (val: string) => {
        const min = 2020;
        const max = 2030;
        const v = parseInt(val, 10);

        return v >= min && v <= max;
    },
    hgt: (val: string) => {
        const v = parseInt(val, 10);

        if (val.indexOf('in') > 0) {
            return v >= 59 && v <= 76;
        }

        if (val.indexOf('cm') > 0) {
            return v >= 150 && v <= 193;
        }

        return false;
    },
    hcl: (val: string) => {
        return /^#[a-f0-9]{6}$/.test(val);
    },
    ecl: (val: string) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
    },
    pid: (val: string) => {
        return /^[0-9]{9}$/.test(val);
    },
};

function processLine(line: string) {
    return line.split(' ').reduce((acc, pair) => {
        const [key, value] = pair.split(':');

        return {
            ...acc,
            [key]: value,
        };
    }, {});
}

async function getInput(file: string) {
    const text = await Deno.readTextFile(file);
    const lines = text.split(/\n/);
    const passpords = [];
    let passpord = {};

    for (const line of lines) {
        if (line === '') {
            passpords.push(passpord);
            passpord = {};
            continue;
        }

        passpord = {
            ...passpord,
            ...processLine(line),
        };
    }

    if (Object.keys(passpord).length > 0) {
        passpords.push(passpord);
    }

    return passpords;
}

function isValid(passpord: Passpord): boolean {
    const fields = Object.keys(passpord);

    return EXPECTED_FIELDS.every((field) => {
        return fields.includes(field);
    });
}

function isValidEnhanced(passpord: Passpord): boolean {
    return Object.keys(FIELD_RULES).every((field: string) => {
        const validator = FIELD_RULES[field as keyof typeof FIELD_RULES];

        if (!passpord[field]) {
            return false;
        }

        return validator(passpord[field]);
    });
}

(async () => {
    const input = await getInput('./input.txt');
    const count = input.reduce((acc: number, passpord) => {
        if (isValidEnhanced(passpord)) {
            return acc + 1;
        }

        return acc;
    }, 0);

    console.log('count', count);
})();

export {};
