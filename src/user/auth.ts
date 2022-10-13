import { assignUserClient, detachUserClient } from "./client";
import { addUser } from "./mutate";
import { changePresence, updateUserPresence } from "./presence";

export async function join(client: string, username: string): Promise<boolean> {
  console.log(`User is joining with nickname '${username}'.`);

  const result = await addUser({
    online: true,
    name: username,
    color: "blue",
    coins: 0,
  });

  if (!result) {
    changePresence(username, true);
  }

  assignUserClient(username, client);

  await updateUserPresence();

  return result;
}

export async function leave(username: string): Promise<boolean> {
  detachUserClient(username);

  return await changePresence(username, false);
}
