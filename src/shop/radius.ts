import { Socket } from "socket.io";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";

export async function buyRadius(
  username: string,
  userIndex: number,
  rad: number,
  socket: Socket
) {
  let smallerversions = [];

  for (let i = 0; i < rad - 1; i++) {
    smallerversions.push(`radinc${i}`);
  }

  const users = await getUsersDB();
  const user = await getUser(username);

  if (!user) return;

  user.radius = rad;

  for (let i = 0; i < smallerversions.length; i++) {
    if (!user.purchases.includes(smallerversions[i]))
      user.purchases.push(smallerversions[i]);
  }

  users[userIndex] = user;

  await setUsersDB(users);

  socket.emit("update-user", user);
}
