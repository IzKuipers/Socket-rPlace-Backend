import { readFile, writeFile } from "fs/promises";
import { User } from "./interface";

export let users: User[] = [];
export let counter = 0;
export async function initDB() {
  const file = await readFile("users.json", { encoding: "utf-8" });

  users = JSON.parse(file) as User[];
}

initDB();

export async function getUsersDB(): Promise<User[]> {
  return users;
}

export async function setUsersDB(u: User[]): Promise<boolean> {
  users = u;

  counter++;

  if (counter > 15 && users.length) {
    const str = JSON.stringify(users);
    console.log(
      `setUsersDB: saving grid to ./users.json (${str.length / 1024}KB)`
    );
    await writeFile("users.json", str, { encoding: "utf-8" });
    counter = 0;
  }

  return true;
}
