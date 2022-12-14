import { Socket } from "socket.io";

export interface ShopItem {
  title: string;
  description: string;
  icon: string;
  price: number;
  tag: string;
  exec: (
    price: number,
    socket: Socket,
    userIndex: number,
    username: string
  ) => void;
  cat?: Cat;
}

export interface Cat {
  tag: string;
  icon: string;
  name: string;
}
