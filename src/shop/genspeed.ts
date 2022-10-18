import { Socket } from "socket.io";
import { startGenerator } from "../coins/generator";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { getShopItem } from "./main";
export async function upgradeGenSpeed(
  userIndex: number,
  username: string,
  speed: number,
  socket: Socket,
  idx: number
) {
  let smallerversions = [];

  for (let i = 0; i < idx; i++) {
    if (getShopItem(`genspeed${i}`)) smallerversions.push(`genspeed${i}`);
  }

  const users = await getUsersDB();
  const user = await getUser(username);

  if (!user) return;

  user.genspeed = speed;

  for (let i = 0; i < smallerversions.length; i++) {
    if (!user.purchases.includes(smallerversions[i]))
      user.purchases.push(smallerversions[i]);
  }

  users[userIndex] = user;

  await setUsersDB(users);

  socket.emit("update-user", user);
  startGenerator(socket, username);
}

export async function upgradeGenAmount(
  userIndex: number,
  username: string,
  amount: number,
  socket: Socket,
  idx: number
) {
  let smallerversions = [];

  for (let i = 0; i < idx; i++) {
    if (getShopItem(`genspeed${i}`)) smallerversions.push(`genspeed${i}`);
    if (getShopItem(`genamnt${i}`)) smallerversions.push(`genamnt${i}`);
  }

  const users = await getUsersDB();
  const user = await getUser(username);

  if (!user) return;

  user.genamnt = amount;

  for (let i = 0; i < smallerversions.length; i++) {
    if (!user.purchases.includes(smallerversions[i]))
      user.purchases.push(smallerversions[i]);
  }

  users[userIndex] = user;

  await setUsersDB(users);

  socket.emit("update-user", user);
  startGenerator(socket, username);
}
