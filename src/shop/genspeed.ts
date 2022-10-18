import { Socket } from "socket.io";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { getShopItem } from "./main";
export async function upgradeGenSpeed(
  userIndex: number,
  username: string,
  speed: number,
  socket: Socket
) {
  let smallerversions = [];

  for (let i = 0; i < speed - 1; i++) {
    if (getShopItem(`speedinc${i}`)) smallerversions.push(`radinc${i}`);
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
}
