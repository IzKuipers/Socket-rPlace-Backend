import { mainServer } from "./../server/main";
import { readGrid, writeGrid } from "./db";

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
