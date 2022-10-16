import { Socket } from "socket.io";
import { getUserByClient } from "./client";
import { getUsersDB, setUsersDB } from "./db";
import { getUser } from "./mutate";
import { updateUserPresence } from "./presence";

export const CELL_PRICE = 100;

export async function increment(
  socket: Socket,
  username: string,
  amount: number = 1
) {
  return await getUser(username, async (data, i) => {
    data.coins += amount;

    const users = await getUsersDB();

    users[i] = data;

    updateUserPresence();
    updateCoins(socket);

    await setUsersDB(users);
  });
}

export async function decrement(
  socket: Socket,
  username: string,
  amount: number = 1
) {
  return await getUser(username, async (data, i) => {
    data.coins -= amount;

    const users = await getUsersDB();

    users[i] = data;

    updateUserPresence();
    updateCoins(socket);
    socket;
    await setUsersDB(users);
  });
}

export async function updateCoins(socket: Socket) {
  const username = getUserByClient(socket.id) as string;
  const userdata = await getUser(username);

  if (!userdata) return;

  socket.emit("update-coins", userdata.coins);
}

export async function getCoins(username: string): Promise<number> {
  const userdata = await getUser(username);

  if (!userdata) return -1;

  return userdata.coins || 0;
}
