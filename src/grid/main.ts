import { mainServer } from "./../server/main";
import { readGrid, writeGrid } from "./db";
import { Cell } from "./interface";

export async function placeCell(x: number, y: number, color: string) {
  const grid = await readGrid();

  const data = { x, y, c: color };

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].x == x && grid[i].y == y) {
      grid[i] = data;

      mainServer.emit("update-grid", grid);

      return await writeGrid(grid);
    }
  }

  grid.push({ x, y, c: color });

  mainServer.emit("update-grid", grid);

  return await writeGrid(grid);
}

export async function placeCells(...cells: Cell[]) {
  console.log(`grid/main.ts: placeCells: placing ${cells.length} cells`);
  const grid = await readGrid();

  for (let i = 0; i < cells.length; i++) {
    let exist = false;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j].x == cells[i].x && grid[j].y == cells[i].y) {
        exist = true;
        grid[j] = cells[i];
      }
    }

    if (!exist) {
      grid.push(cells[i]);
    }
  }

  mainServer.emit("update-grid-partial", cells);

  return await writeGrid(grid);
}
