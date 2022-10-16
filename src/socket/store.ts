import { Position } from "./../grid/interface";
import { GEN_INT } from "./../coins/generator";
import { placeCell } from "../grid/main";
import { join } from "../user/auth";
import { CELL_PRICE, getCoins } from "../user/coins";
import { User } from "../user/interface";
import { getUser } from "../user/mutate";
import { SocketListeners } from "./interface";
import { getUsersDB, setUsersDB } from "../user/db";

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

      for (let i = 0; i < cells.length; i++) {
        if (!(await placeCell(cells[i].x, cells[i].y, user.color)))
          cb(false, "place_failure");
      }

      users[i] = user;

      cb(await setUsersDB(users), "written");
    });
  },
  getgenint: async (_, cb: (i: number) => void) => {
    cb(GEN_INT);
  },
};
