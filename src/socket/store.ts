import { Socket } from "socket.io";
import { ShopItem } from "./../shop/interface";
import { Cell, Position } from "./../grid/interface";
import { GEN_INT } from "./../coins/generator";
import { placeCell, placeCells } from "../grid/main";
import { join } from "../user/auth";
import { CELL_PRICE, getCoins, updateCoins } from "../user/coins";
import { User } from "../user/interface";
import { getUser } from "../user/mutate";
import { SocketListeners } from "./interface";
import { getUsersDB, setUsersDB } from "../user/db";
import Products from "../shop/store";
import { getShopItem, purchaseItem } from "../shop/main";

export const socketListeners: SocketListeners = {
  join: async (
    socket,
    username: string,
    cb: (user: User | null, coins: number) => void
  ) => {
    await join(socket, socket.id, username);
    cb((await getUser(username)) as User, await getCoins(username));
  },
  place: async (
    _,
    u: string,
    x: number,
    y: number,
    cb: (v: boolean) => void
  ) => {
    const user = await getUser(u);

    if (!user) return cb(false);

    return cb(await placeCell(x, y, user.color));
  },
  placeMult: async (
    _,
    u: string,
    cb: (v: boolean, msg: string) => void,
    cells: Position[]
  ) => {
    await getUser(u, async (user, i) => {
      if (!cb)
        cb = (v: boolean, msg: string) => {
          console.log(v, msg);
        };

      if (!user) {
        cb(false, "invalid_user");

        return;
      }

      const users = await getUsersDB();

      let price = cells.length * CELL_PRICE;

      if (user.coins <= price) {
        cb(false, "not_enough_coins");
        return;
      }

      user.coins -= price;

      let c: Cell[] = [];

      for (let i = 0; i < cells.length; i++) {
        c.push({ ...cells[i], c: user.color });
      }

      await placeCells(...c);

      users[i] = user;

      cb(await setUsersDB(users), "written");

      updateCoins(_);
    });
  },
  getgenint: async (_, cb: (i: number) => void) => {
    cb(GEN_INT);
  },
  setclr: async (_, u: string, clr: string) => {
    await getUser(u, async (usr, i) => {
      const db = await getUsersDB();

      usr.color = clr;

      db[i] = usr;

      await setUsersDB(db);
    });
  },
  getshopitems: (_, cb: (i: ShopItem[]) => void) => {
    cb(Products);
  },
  purchase(socket: Socket, username: string, item: string) {
    const i = getShopItem(item);

    if (!i) return;

    purchaseItem(username, socket, i);
  },
};
