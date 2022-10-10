import { placeCell } from "../grid/main";
import { join } from "../user/auth";
import { User } from "../user/interface";
import { getUser } from "../user/mutate";
import { SocketListeners } from "./interface";

export const socketListeners: SocketListeners = {
  join: async (socket, username: string, cb: (user: User | null) => void) => {
    join(socket.id, username);
    cb((await getUser(username, () => {})) as User);
  },
  place: async (_, u: string, x: number, y: number, cb: (v: boolean) => {}) => {
    const user = await getUser(u);

    if (!user) return cb(false);

    return cb(await placeCell(x, y, user.color));
  },
};
