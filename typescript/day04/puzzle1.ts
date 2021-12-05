type Config = [number[], number[][][]];

function getConfig(text: string): Config {
    return text.split(/\n/).reduce(
        (config: Config, line, index): Config => {
            const [numbers, boards] = config;

            if (index === 0) {
                return [line.split(',').map((part) => parseInt(part, 10)), []];
            }

            if (line === '') {
                return config;
            }

            const lastBoardLineCount = boards[boards.length - 1]?.length;
            const otherBoards: number[][][] = boards.slice(
                0,
                lastBoardLineCount === 5 ? boards.length : boards.length - 1
            );
            const lastBoard: number[][] = boards[boards.length - 1] ?? [];
            const board = lastBoard.length < 5 ? lastBoard : [];

            return [
                numbers,
                [
                    ...otherBoards,
                    [
                        ...board,
                        line
                            .split(/\s+/)
                            .filter((part) => part !== '')
                            .map((part) => parseInt(part, 10)),
                    ],
                ],
            ];
        },
        [[], [[]]]
    );
}

function sumRow(board: number[][], lineNumber: number): number {
    return board[lineNumber].reduce((total, part) => total + part, 0);
}

function sumColumn(board: number[][], columnNumber: number): number {
    return board.reduce((total, line) => total + line[columnNumber], 0);
}

function hasHorizontalBingo(board: number[][]): boolean {
    return board.some((_, lineNumber) => sumRow(board, lineNumber) === 0);
}

function hasVerticalBingo(board: number[][]): boolean {
    return board[0].some(
        (_, columnNumber) => sumColumn(board, columnNumber) === 0
    );
}

function hasBingo(board: number[][]): boolean {
    if (hasHorizontalBingo(board)) {
        console.log('horizontal bingo', board);
        return true;
    }
    if (hasVerticalBingo(board)) {
        console.log('vertical bingo', board);
        return true;
    }

    return false;
}

async function puzzle1(fileName: string): Promise<number> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
    let [numbers, boards] = getConfig(text);
    let winnerBoardIndex = 0;
    let winningNumber = 0;

    for (const n of numbers) {
        let bingo = false;

        boards = boards.map((board, i) => {
            if (bingo) {
                return board;
            }

            const newBoard = board.map((line) =>
                line.map((part) => (part !== n ? part : 0))
            );

            bingo = hasBingo(newBoard);

            if (bingo) {
                winnerBoardIndex = i;
                winningNumber = n;
            }

            return newBoard;
        });

        if (bingo) {
            break;
        }
    }

    const winner = boards[winnerBoardIndex];
    const total = winner.reduce((total, line) => {
        return total + line.reduce((subtotal, part) => subtotal + part, 0);
    }, 0);

    return total * winningNumber;
}

console.log(await puzzle1('input1'));

/**

[
    [14, 21, 17, 24,  4],
    [10, 16, 15,  9, 19],
    [18,  8, 23, 26, 20],
    [22, 11, 13,  6,  5],
    [ 2,  0, 12,  3,  7],
]
 */
