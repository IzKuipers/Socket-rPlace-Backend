import { mainServer } from "./../server/main";
import { getUsersDB, setUsersDB } from "./db";
import { User } from "./interface";
import { getUser } from "./mutate";

export async function updateUserPresence(): Promise<void> {
  const users = await getUsersDB();

  let present: User[] = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].online) {
      present.push(users[i]);
    }
  }

  mainServer.emit("update-presence", present);
}

export async function changePresence(
  username: string,
  online: boolean
): Promise<boolean> {
  const result = !!(await getUser(username, async (user, i) => {
    user.online = online;

    const users = await getUsersDB();

    users[i] = user;

    await setUsersDB(users);

    updateUserPresence();
  }));

  return result;
}
