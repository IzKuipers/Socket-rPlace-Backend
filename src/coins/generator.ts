import { Socket } from "socket.io";
import { updateCoins } from "../user/coins";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { updateUserPresence } from "../user/presence";

export const Generators: { [key: string]: NodeJS.Timer } = {};

export async function startGenerator(socket: Socket, username: string) {
  if (Generators[username]) clearInterval(Generators[username]);

  Generators[username] = setInterval(async () => {
    await getUser(username, async (user, i) => {
      const users = await getUsersDB();
      const level = Math.floor(user.coins / 100);

      user.coins += level > 1 ? Math.floor(5 * level) : 5;

      users[i] = user;

      await setUsersDB(users);

      updateCoins(socket);
      updateUserPresence();
    });
  }, 3500);
}
