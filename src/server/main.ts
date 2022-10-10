import { Server } from "socket.io";
import { socketListener } from "../socket/listen";
import { stopSocket } from "../socket/main";

export let mainServer: Server;

export function startServer(port?: number) {
  mainServer = new Server(port || 3190, { cors: { origin: "*" } });
  mainServer.on("connection", socketListener);
  mainServer.on("disconnect", stopSocket);

  console.log(`Started server on port ${port || 3190}`);
}
