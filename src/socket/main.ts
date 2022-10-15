import { detachUserClient, UserClients } from "./../user/client";
import { Socket } from "socket.io";
import { leave } from "../user/auth";

export async function stopSocket(socket: Socket) {
  socket._cleanup();

  for (const client of UserClients) {
    if (client[1] == socket.id) {
      detachUserClient(client[0]);

      leave(socket, client[0]);
    }
  }
}
