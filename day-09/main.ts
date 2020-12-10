function matches(target: number, ref: number[]): boolean {
    const max = ref.length;

    for (let outer = 0; outer < max - 1; outer += 1) {
        for (let inner = outer + 1; inner < max; inner += 1) {
            if (ref[outer] + ref[inner] === target) {
                return true;
            }
        }
    }

    return false;
}

function check(numbers: number[], preamble: number): number {
    for (let index = preamble; index < numbers.length; index += 1) {
        const target = numbers[index];
        const ref = numbers.slice(index - preamble, index);

        if (!matches(target, ref)) {
            return target;
        }
    }

    return -1;
}

function sum(target: number, numbers: number[], start: number) {
    const add = [];
    let total = 0;

    for (let index = start; index < numbers.length; index += 1) {
        total += numbers[index];
        add.push(numbers[index]);

        if (total === target) {
            return add;
        }

        if (total > target) {
            return [];
        }
    }

    return [];
}

function find(target: number, numbers: number[]) {
    for (let index = 0; index < numbers.length - 1; index += 1) {
        const result = sum(target, numbers, index);

        if (result.length) {
            return result;
        }
    }

    return [];
}

(async () => {
    const preamble = 25;
    const text = await Deno.readTextFile('./input.txt');
    const numbers = text.split(/\n/).map((line) => parseInt(line, 10));

    // matches(40, numbers.slice(0, preamble));
    // console.log(check(numbers, preamble));
    const err = check(numbers, preamble);
    const result = find(err, numbers);

    result.sort((a, b) => {
        return a > b ? 1 : -1;
    });

    console.log('err', err);
    console.log(result);
    console.log('result', result[0] + result[result.length - 1]);
})();

export {};
