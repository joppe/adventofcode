async function puzzle2(fileName: string): Promise<void> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
}
