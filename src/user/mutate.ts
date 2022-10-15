import { Socket } from "socket.io";
import { startGenerator } from "../coins/generator";
import { getUsersDB, setUsersDB } from "./db";
import { User } from "./interface";

export async function addUser(socket: Socket, user: User): Promise<boolean> {
  const users = await getUsersDB();

  if (await getUser(user.name, () => {})) {
    return false;
  }

  startGenerator(socket, user.name);

  console.log(`addUser: Adding user '${user.name}'`);

  users.push(user);

  return await setUsersDB(users);
}

export async function removeUser(user: User): Promise<boolean> {
  const users = await getUsersDB();

  for (let i = 0; i < users.length; i++) {
    if (users[i].name == user.name) {
      users.splice(i, 1);

      console.log(`removeUser: removing user '${user.name}'`);

      return await setUsersDB(users);
    }
  }

  return false;
}

export async function getUser(
  username: string,
  cb: (user: User, i: number) => void = () => {}
): Promise<User | false> {
  const users = await getUsersDB();

  for (let i = 0; i < users.length; i++) {
    if (users[i].name == username) {
      cb(users[i], i);
      return users[i];
    }
  }

  return false;
}

export async function userExists(username: string): Promise<boolean> {
  return !!(await getUser(username));
}
