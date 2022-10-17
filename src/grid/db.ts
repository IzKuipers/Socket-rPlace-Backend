import { readFile, writeFile } from "fs/promises";
import { Grid } from "./interface";

export let grid: Grid = [];
let counter = 0;

export async function getDB() {
  const file = await readFile("grid.json", { encoding: "utf-8" });

  grid = JSON.parse(file) as Grid;
}

getDB();

export async function readGrid(): Promise<Grid> {
  return grid;
}

export async function writeGrid(g: Grid): Promise<boolean> {
  grid = g;

  counter++;

  if (counter >= 25) {
    await writeFile("grid.json", JSON.stringify(grid), { encoding: "utf-8" });
    counter = 0;
  }

  return true;
}
