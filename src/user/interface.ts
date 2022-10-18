export interface User {
  online: boolean;
  name: string;
  color: string;
  coins: number;
  radius: number;
  genspeed: number;
  genamnt: number;
  purchases: string[];
}

export type DotColor = "red" | "green" | "orange" | "yellow" | "blue" | "aqua";
