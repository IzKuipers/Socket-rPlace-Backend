import { getUsersDB } from "./db";
import { DotColor } from "./interface";

export async function getRandomAvailableColor(): Promise<DotColor> {
  const users = await getUsersDB();

  const colors = ["red", "green", "orange", "yellow", "blue", "aqua"];
  let used: DotColor[] = [];

  for (let i = 0; i < users.length; i++) {
    if (!used.includes(users[i].color as DotColor))
      used.push(users[i].color as DotColor);
  }

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < used.length; j++) {
      if (used[j] == colors[i]) colors.splice(i, 1);
    }
  }

  return colors[Math.floor(Math.random() * (colors.length - 1))] as DotColor;
}
