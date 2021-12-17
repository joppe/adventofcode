import { getLines, toInt } from '../util/util.ts';

enum NodeType {
    Start,
    Small,
    Big,
    End,
}

type Node = {
    type: NodeType;
    label: string;
    connections: Node[];
};

type Graph = {
    [name: string]: Node;
};

type Path = string[];

function getType(name: string): NodeType {
    if (name === 'start') {
        return NodeType.Start;
    }

    if (name === 'end') {
        return NodeType.End;
    }

    if (name.toUpperCase() === name) {
        return NodeType.Big;
    }

    return NodeType.Small;
}

async function puzzle1(isTestRun = false): Promise<number> {
    const dir = new URL('.', import.meta.url).pathname;
    const file = isTestRun ? 'ref1.txt' : 'input1.txt';
    const filePath = `${dir}${file}`;
    const lines = await getLines(filePath);
    const graph: Graph = {};
    const paths: Path[] = [];

    function addNode(name: string): Node {
        if (graph[name] === undefined) {
            graph[name] = {
                type: getType(name),
                label: name,
                connections: [],
            };
        }

        return graph[name];
    }

    function findPath(node: Node, path: Path) {
        for (const connection of node.connections) {
            if (
                connection.type === NodeType.Start ||
                (connection.type === NodeType.Small &&
                    path.includes(connection.label))
            ) {
                continue;
            }

            if (connection.type === NodeType.End) {
                paths.push(path.concat(connection.label));
                continue;
            }

            findPath(connection, path.concat(connection.label));
        }
    }

    for (const line of lines) {
        const [a, b] = line.split('-').map(addNode);

        a.connections.push(b);
        b.connections.push(a);
    }

    const start = graph['start'];

    findPath(graph['start'], ['start']);

    return paths.length;
}

console.log('result', await puzzle1(false));