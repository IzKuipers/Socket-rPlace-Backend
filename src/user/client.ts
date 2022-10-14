import { broadcastClientsUpdate } from "../clients/main";

export const UserClients: Map<string, string> = new Map<string, string>([]);

export async function assignUserClient(user: string, client: string) {
  if (!UserClients.has(user)) {
    console.log(
      `assignUserClient: Attaching user '${user}' to client '${client}'`
    );

    UserClients.set(user, client);

    broadcastClientsUpdate();

    return true;
  }

  console.log(
    `assignUserClient: Warning: ${user} is already assigned to client '${UserClients.get(
      user
    )}'!`
  );

  broadcastClientsUpdate();

  return false;
}

export function detachUserClient(user: string) {
  if (!UserClients.has(user)) {
    console.log(
      `detachUserClient: Warning: can't detach user '${user}': no client assigned to that name.`
    );

    broadcastClientsUpdate();

    return false;
  }

  console.log(
    `detachUserClient: Detaching '${UserClients.get(
      user
    )}' from user '${user}'.`
  );

  UserClients.delete(user);
  broadcastClientsUpdate();

  return true;
}

export function getUserByClient(client: string) {
  for (const c of UserClients) {
    if (c[1] == client) return c[0];
  }

  return null;
}
