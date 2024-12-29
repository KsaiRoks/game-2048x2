import { IGridTile, ITile, TGrid } from "./types";

const SIZE = 4;

function generateMatrix(size: number) {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => null)
    );
}

export function generateGrid(grid?: (number | null)[][]): TGrid {
    if (grid === undefined) return generateMatrix(SIZE);
    return grid.map((row, y) => {
        return row.map((value, x) => {
            if (value === null) return null;
            const tile: ITile = { x, y, value };
            const id = new Date().getTime();
            return { id, from: null, to: null, final: tile };
        });
    });
}

export function converGrid(grid: TGrid): (number | "x2" | null)[][] {
    return grid.map(row => {
        return row.map(tile => {
            if (tile === null) return null;
            return tile.final.value;
        });
    });
}

function getEmptyCoords(grid: TGrid): [number, number][] {
    const list: [number, number][] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === null) list.push([x, y]);
        }
    }
    return list;
}

export function randomSetTile(_grid: TGrid, numOfTiles: number = 1) {
    const grid = _grid.map<(IGridTile | null)[]>(row =>
        row.map<IGridTile | null>((tile: IGridTile | null) => tile)
    );
    const list = getEmptyCoords(grid);
    if (list.length < numOfTiles) return grid;
    for (let i = 0; i < numOfTiles; i++) {
        const index = Math.floor(Math.random() * list.length);
        const [x, y] = list[index];

        const randomValue = Math.random();
        const value = randomValue < 0.9 ? (randomValue < 0.25 ? 4 : 2) : "x2";

        const tile: ITile = { x, y, value };
        const id = new Date().getTime();
        grid[y][x] = { id, from: null, to: tile, final: tile };
        list.splice(index, 1);
    }
    return grid;
}

export function move(_grid: TGrid, type: "up" | "down" | "left" | "right") {
    const grid = _grid.map<(IGridTile | null)[]>(row =>
        row.map<IGridTile | null>((tile: IGridTile | null) => tile)
    );
    let score = 0,
        changed = false;
    for (let i = 0; i < SIZE; i++) {
        let j = 0,
            k = 0;
        while (k < SIZE) {
            const [x1, y1, x2, y2] =
                type === "up"
                    ? [i, j, i, k]
                    : type === "down"
                        ? [i, SIZE - 1 - j, i, SIZE - 1 - k]
                        : type === "left"
                            ? [j, i, k, i]
                            : [SIZE - 1 - j, i, SIZE - 1 - k, i];
            const from = grid[y2][x2];
            const to = grid[y1][x1];
            if (from === null) {
                k++;
                continue;
            }
            if (j === k) {
                const id = new Date().getTime();
                const final = { x: x1, y: y1, value: from.final.value };
                grid[y1][x1] = { id, from: null, to: null, final };
                k++;
                continue;
            }
            if (to === null) {
                if (!changed) changed = true;
                const id = new Date().getTime();
                const final = { x: x1, y: y1, value: from.final.value };
                grid[y1][x1] = { id, from: { ...from.final }, to: null, final };
                grid[y2][x2] = null;
                k++;
                continue;
            }

            if (from.final.value === to.final.value || from.final.value === "x2" || to.final.value === "x2") {
                if (!changed) changed = true;

                let value: number | null = null;
                if (from.final.value === "x2" && typeof to.final.value === "number") {
                    value = to.final.value * 2;
                } else if (to.final.value === "x2" && typeof from.final.value === "number") {
                    value = from.final.value * 2;
                } else if (from.final.value === "x2" && to.final.value === "x2") {
                    value = null;
                } else if (typeof from.final.value === "number" && typeof to.final.value === "number") {
                    value = from.final.value + to.final.value;
                }

                if (value !== null) {
                    score += value;
                    const id = new Date().getTime();
                    const final = { x: x1, y: y1, value };
                    grid[y1][x1] = {
                        id,
                        from: { ...from.final },
                        to: { ...to.final },
                        final
                    };
                } else {
                    grid[y1][x1] = null;
                }
                grid[y2][x2] = null;
                j++;
                k++;
                continue;
            }
            j++;
        }
    }
    return { score, changed, grid };
}

export function removeAnimation(grid: TGrid) {
    return grid.map<(IGridTile | null)[]>(row => {
        return row.map<IGridTile | null>((tile: IGridTile | null) => {
            if (tile === null) return null;
            const id = new Date().getTime();
            return { id, from: null, to: null, final: { ...tile.final } };
        });
    });
}

export function isDone(grid: TGrid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const cur = grid[y][x];
            if (cur === null) return false;
            const left = y - 1 < 0 ? undefined : grid[y - 1][x],
                up = x - 1 < 0 ? undefined : grid[y][x - 1];
            if (left === undefined && up === undefined) continue;
            if (left !== undefined && left !== null && left.final.value === cur.final.value) return false;
            if (up !== undefined && up !== null && up.final.value === cur.final.value) return false;
        }
    }
    return true;
}