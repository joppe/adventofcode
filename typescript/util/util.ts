export async function getLines(filePath: string): Promise<string[]> {
    const text = await Deno.readTextFile(filePath);

    return text.split(/\n/);
}

export function toInt(str: string): number {
    return parseInt(str, 10);
}

export function square(nmbr: number): number {
    return nmbr * nmbr;
}

function isSameArray<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return a.every((el) => b.includes(el));
}
