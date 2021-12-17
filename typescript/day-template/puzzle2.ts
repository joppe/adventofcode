import { getLines, toInt } from '../util/util.ts';

async function puzzle(isTestRun = false): Promise<void> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
}

console.log('result', await puzzle(true));
