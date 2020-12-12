type Vector = {
    x: number;
    y: number;
};

type Position = {
    x: number;
    y: number;
};

const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const FORWARD = 'F';

function deg2rad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function precise(n: number): number {
    return parseFloat(n.toFixed(2));
}

function manhattanDistance(position: Position): number {
    return Math.abs(position.x) + Math.abs(position.y);
}

function angle(a: Vector): number {
    return Math.atan2(a.y, a.x);
}

function length(a: Vector): number {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}

function rotate(a: Vector, radians: number): Vector {
    const sum: number = angle(a) + radians;
    const len: number = length(a);

    return {
        x: precise(len * Math.cos(sum)),
        y: precise(len * Math.sin(sum)),
    };
}

function part1(lines: string[]): Position {
    let direction = Math.PI;
    const position = {
        x: 0,
        y: 0,
    };

    for (const line of lines) {
        const action = line.substring(0, 1);
        const amount = parseInt(line.substring(1));

        switch (action) {
            case FORWARD:
                position.x += amount * precise(Math.cos(direction));
                position.y += amount * precise(Math.sin(direction));
                break;
            case NORTH:
                position.y -= amount;
                break;
            case SOUTH:
                position.y += amount;
                break;
            case EAST:
                position.x -= amount;
                break;
            case WEST:
                position.x += amount;
                break;
            case LEFT:
                direction += deg2rad(amount);
                break;
            case RIGHT:
                direction -= deg2rad(amount);
                break;
        }
    }

    return position;
}

function part2(lines: string[]): Position {
    let waypoint = {
        x: -10,
        y: -1,
    };
    const position = { x: 0, y: 0 };

    for (const line of lines) {
        const action = line.substring(0, 1);
        const amount = parseInt(line.substring(1));

        switch (action) {
            case FORWARD:
                position.x += amount * waypoint.x;
                position.y += amount * waypoint.y;
                break;
            case NORTH:
                waypoint.y -= amount;
                break;
            case SOUTH:
                waypoint.y += amount;
                break;
            case EAST:
                waypoint.x -= amount;
                break;
            case WEST:
                waypoint.x += amount;
                break;
            case LEFT:
                waypoint = rotate(waypoint, deg2rad(amount));
                break;
            case RIGHT:
                waypoint = rotate(waypoint, -deg2rad(amount));
                break;
        }
    }

    return position;
}

(async () => {
    const text = await Deno.readTextFile('./input.txt');
    const lines = text.split(/\n/);

    // const position = part1(lines);
    const position = part2(lines);
    console.log('result', position);
    console.log('manhattan distance', manhattanDistance(position));
})();

export {};
