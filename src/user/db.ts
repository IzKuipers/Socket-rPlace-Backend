import { readFile, writeFile } from "fs/promises";
import { User } from "./interface";

export async function getUsersDB(): Promise<User[]> {
  try {
    const file = await readFile("users.json", { encoding: "utf-8" });

    return JSON.parse(file) as User[];
  } catch {
    await writeFile("users.json", "[]", { encoding: "utf-8" });

    return [];
  }
}

export async function setUsersDB(users: User[]): Promise<boolean> {
  try {
    await writeFile("users.json", JSON.stringify(users), { encoding: "utf-8" });

    return true;
  } catch {
    return false;
  }
}
