import { placeCell } from "../grid/main";
import { join } from "../user/auth";
import { getCoins } from "../user/coins";
import { User } from "../user/interface";
import { getUser } from "../user/mutate";
import { SocketListeners } from "./interface";

export const socketListeners: SocketListeners = {
  join: async (
    socket,
    username: string,
    cb: (user: User | null, coins: number) => void
  ) => {
    await join(socket.id, username);
    cb((await getUser(username)) as User, await getCoins(username));
  },
  place: async (_, u: string, x: number, y: number, cb: (v: boolean) => {}) => {
    const user = await getUser(u);

    if (!user) return cb(false);

    return cb(await placeCell(x, y, user.color));
  },
};
