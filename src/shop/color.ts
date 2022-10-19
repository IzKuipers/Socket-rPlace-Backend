import { Socket } from "socket.io";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { DotColor } from "./../user/interface";
export async function upgradeUserColor(
  username: string,
  userIndex: number,
  color: DotColor,
  socket: Socket
) {
  const users = await getUsersDB();
  const user = await getUser(username);

  if (!user) return;

  user.color = color;

  users[userIndex] = user;

  socket.emit("update-user", user);

  await setUsersDB(users);
}
