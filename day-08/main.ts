/**
 * Operations acc, jmp, nop
 */

type Instruction = {
    command: string;
    arg: number;
};

type RunResult = {
    acc: number;
    loop: boolean;
};

type FixResult = {
    instructions: Instruction[];
    foundIndex: number;
};

function getInstructions(text: string): Instruction[] {
    return text.split(/\n/).map((line) => {
        const [command, arg] = line.split(' ');

        return {
            command,
            arg: parseInt(arg, 10),
        };
    });
}

function run(instructions: Instruction[]): RunResult {
    const lines: number[] = [];
    let index = 0;
    let acc = 0;

    while (!lines.includes(index) && index < instructions.length) {
        const instruction = instructions[index];

        lines.push(index);

        if (instruction.command === 'nop') {
            index += 1;
        } else if (instruction.command === 'acc') {
            acc += instruction.arg;
            index += 1;
        } else if (instruction.command === 'jmp') {
            index += instruction.arg;
        } else {
            break;
        }
    }

    return { acc, loop: index !== instructions.length };
}

function alter(
    instructions: Instruction[],
    from: string,
    to: string,
    index: number
): FixResult {
    let foundIndex = -1;

    return {
        instructions: instructions.map((instruction, i) => {
            if (
                foundIndex === -1 &&
                i >= index &&
                instruction.command === from
            ) {
                foundIndex = i;

                return {
                    command: to,
                    arg: instruction.arg,
                };
            }

            return instruction;
        }),
        foundIndex,
    };
}

function fix(instructions: Instruction[]): RunResult {
    const changes = [
        ['jmp', 'nop'],
        ['nop', 'jmp'],
    ];
    let result = run(instructions);

    for (let c = 0; c < changes.length; c += 1) {
        let index = -1;

        do {
            let altered = alter(
                instructions,
                changes[c][0],
                changes[c][1],
                index + 1
            );
            index = altered.foundIndex;
            result = run(altered.instructions);
        } while (index !== -1 && result.loop);

        if (!result.loop) {
            break;
        }
    }

    return result;
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const instructions = getInstructions(text);

    console.log('result', fix(instructions));
})();

export {};
