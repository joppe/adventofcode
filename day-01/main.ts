async function getInput() {
    const text = await Deno.readTextFile('./input.txt');

    return text
        .split(/\n/)
        .filter((val) => val !== '')
        .map((val) => parseInt(val, 10));
}

function findPair(arr: number[], check: number): [number, number] {
    const max = arr.length;

    for (let outer = 0; outer < max - 1; outer += 1) {
        const a = arr[outer];

        if (a > check) {
            continue;
        }

        for (let inner = outer + 1; inner < max; inner += 1) {
            const b = arr[inner];
            const sum = a + b;

            if (sum === check) {
                return [a, b];
            }
        }
    }

    throw new Error('No pair found');
}

function findThree(arr: number[], check: number): [number, number, number] {
    const max = arr.length;

    for (let outer = 0; outer < max - 2; outer += 1) {
        const a = arr[outer];

        if (a > check) {
            continue;
        }

        for (let mid = outer + 1; mid < max - 1; mid += 1) {
            const b = arr[mid];

            if (b > check || a + b > check) {
                continue;
            }

            for (let inner = mid + 1; inner < max; inner += 1) {
                const c = arr[inner];
                const sum = a + b + c;

                if (sum === check) {
                    return [a, b, c];
                }
            }
        }
    }

    throw new Error('No three found');
}

(async () => {
    const input = await getInput();
    const check = 2020;

    const pair = findPair(input, check);
    console.log('pair', pair, pair[0] * pair[1]);

    const three = findThree(input, check);
    console.log('tripple', three, three[0] * three[1] * three[2]);
})();

export {};
