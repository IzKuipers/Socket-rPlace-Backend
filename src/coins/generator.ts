import { Socket } from "socket.io";
import { updateCoins } from "../user/coins";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { updateUserPresence } from "../user/presence";

export const Generators: { [key: string]: NodeJS.Timer } = {};
export const GEN_INT = 3500;

export async function startGenerator(socket: Socket, username: string) {
  if (Generators[username]) clearInterval(Generators[username]);

  Generators[username] = setInterval(async () => {
    await getUser(username, async (user, i) => {
      const users = await getUsersDB();
      const level = Math.floor(user.coins / 100);

      user.coins += user.coins > 250000 ? 5000 : 5 * (level || 1);

      users[i] = user;

      await setUsersDB(users);

      updateCoins(socket);
      updateUserPresence();
    });
  }, GEN_INT);
}
