import { readFile, writeFile } from "fs/promises";
import { Grid } from "./interface";

export async function readGrid(): Promise<Grid> {
  try {
    const file = await readFile("grid.json", { encoding: "utf-8" });

    return JSON.parse(file) as Grid;
  } catch {
    await writeFile("grid.json", "[]", { encoding: "utf-8" });

    return [];
  }
}

export async function writeGrid(grid: Grid): Promise<boolean> {
  try {
    await writeFile("grid.json", JSON.stringify(grid), { encoding: "utf-8" });

    return true;
  } catch {
    return false;
  }
}
