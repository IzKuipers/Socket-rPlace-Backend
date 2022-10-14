import { getUsersDB, setUsersDB } from "./db";
import { User } from "./interface";

export async function addUser(user: User): Promise<boolean> {
  const users = await getUsersDB();

  if (await getUser(user.name, () => {})) {
    return false;
  }

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
      console.log(`getUser: Got userdata for '${username}'`);
      /* updateUserPresence(); */
      return users[i];
    }
  }

  return false;
}

export async function userExists(username: string): Promise<boolean> {
  return !!(await getUser(username));
}
