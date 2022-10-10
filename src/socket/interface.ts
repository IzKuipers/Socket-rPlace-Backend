import { Socket } from "socket.io";

export type SocketListeners = {
  [key: string]: (socket: Socket, ...args: any[]) => any | Promise<any>;
};
