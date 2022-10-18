import { Socket } from "socket.io";
import { assignUserClient, detachUserClient } from "./client";
import { addUser } from "./mutate";
import { changePresence, updateUserPresence } from "./presence";

export async function join(
  socket: Socket,
  client: string,
  username: string
): Promise<boolean> {
  console.log(`User is joining with nickname '${username}'.`);

  const result = await addUser(socket, {
    online: true,
    name: username,
    color: "blue",
    coins: 0,
    radius: 1,
    genspeed: 3500,
    purchases: [],
  });

  if (!result) {
    changePresence(socket, username, true);
  }

  assignUserClient(username, client);

  await updateUserPresence();

  return result;
}

export async function leave(
  socket: Socket,
  username: string
): Promise<boolean> {
  detachUserClient(username);

  return await changePresence(socket, username, false);
}
