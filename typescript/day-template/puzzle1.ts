async function puzzle1(fileName: string): Promise<void> {
    const text = await Deno.readTextFile(`./${fileName}.txt`);
}
