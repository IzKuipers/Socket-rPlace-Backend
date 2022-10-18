import { Socket } from "socket.io";
import { updateCoins } from "../user/coins";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { updateUserPresence } from "../user/presence";

export const Generators: { [key: string]: NodeJS.Timer } = {};
export const GEN_INT = 3500;

export async function startGenerator(socket: Socket, username: string) {
  const user = await getUser(username);
  if (!user) return;
  if (Generators[username]) clearInterval(Generators[username]);

  Generators[username] = setInterval(async () => {
    console.log(
      `Generator: TICK for user ${user.name}: ${user.genamnt} every ${user.genspeed}ms`
    );
    await getUser(username, async (user, i) => {
      const users = await getUsersDB();

      user.coins += user.genamnt;

      users[i] = user;

      await setUsersDB(users);

      updateCoins(socket);
      updateUserPresence();
      socket.emit("update-user", user);
    });
  }, user.genspeed);
}
