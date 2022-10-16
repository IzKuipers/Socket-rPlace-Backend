import { Socket } from "socket.io";
import { registerClient, removeClient } from "../clients/main";
import { readGrid } from "../grid/db";
import { leave } from "../user/auth";
import { getUserByClient } from "../user/client";
import { updateUserPresence } from "../user/presence";
import { stopSocket } from "./main";
import { socketListeners } from "./store";

export async function socketListener(socket: Socket) {
  registerClient(socket.id);

  socket.on("disconnect", () => {
    leave(socket, getUserByClient(socket.id) as string);
    removeClient(socket.id);
    stopSocket(socket);
  });

  const listeners = Object.entries(socketListeners) || [];

  console.log(
    `socketListener: assigning ${listeners.length} listeners to ${socket.id}`
  );

  for (let i = 0; i < listeners.length; i++) {
    const name = listeners[i][0];
    const func = listeners[i][1];

    socket.on(name, (...args: any[]) => {
      try {
        func(socket, ...args);
      } catch {
        console.log(
          `socketListener: execution of event ${name} failed on client ${socket.id}.`
        );
      }
    });
  }

  updateUserPresence();
  socket.emit("server-connected");
  socket.emit("update-grid", await readGrid());
}
