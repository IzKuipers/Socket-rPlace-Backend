import { mainServer } from "./../server/main";

export const clients: string[] = [];

export async function registerClient(client: string) {
  console.log(`registerClient: client ${client} has joined.`);

  if (!clients.includes(client)) {
    clients.push(client);
  }

  broadcastClientsUpdate();
}

export async function removeClient(client: string) {
  console.log(`removeClient  : client ${client} has left.`);

  for (let i = 0; i < clients.length; i++) {
    if (clients[i] == client) {
      clients.splice(i, 1);
    }
  }

  broadcastClientsUpdate();
}

export async function broadcastClientsUpdate() {
  mainServer.emit("clients-update", clients);
}
