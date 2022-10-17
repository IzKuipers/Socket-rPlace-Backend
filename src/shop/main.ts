import { Socket } from "socket.io";
import { getUsersDB, setUsersDB } from "../user/db";
import { getUser } from "../user/mutate";
import { ShopItem } from "./interface";
import Products from "./store";

export async function purchaseItem(
  username: string,
  socket: Socket,
  item: ShopItem
) {
  if (await canAfford(username, item)) {
    await getUser(username, async (user, i) => {
      const users = await getUsersDB();

      user.coins -= item.price;
      user.purchases.push(item.tag);

      users[i] = user;

      await setUsersDB(users);
      await item.exec(item.price, socket, i, username);

      socket.emit("purchased-item", item);
      socket.emit("update-user", user);
    });
  }
}

export async function canAfford(username: string, item: ShopItem) {
  const user = await getUser(username);

  if (!user) return false;

  return user.coins >= item.price;
}

export function getShopItem(tag: string): ShopItem | false {
  for (let i = 0; i < Products.length; i++) {
    if (Products[i].tag == tag) return Products[i];
  }

  return false;
}
