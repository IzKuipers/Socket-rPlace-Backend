import { upgradeGenAmount, upgradeGenSpeed } from "./genspeed";
import { Cat, ShopItem } from "./interface";
import { buyRadius } from "./radius";

const Cats: { [key: string]: Cat } = {
  radius: {
    icon: "filter_tilt_shift",
    name: "Radius upgrades",
    tag: "radiusup",
  },
  gen: {
    icon: "speed",
    name: "Generators",
    tag: "genupg",
  },
};

const Products: ShopItem[] = [
  {
    title: "Meh Radius",
    description: "Set your diameter to 3 cells",
    icon: "filter_tilt_shift",
    price: 100,
    tag: "radinc2",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 2, socket, 2);
    },
    cat: Cats["radius"],
  },
  {
    title: "Mild Radius",
    description: "Set your diameter to 7 cells",
    icon: "filter_tilt_shift",
    price: 300,
    tag: "radinc4",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 4, socket, 4);
    },
    cat: Cats["radius"],
  },
  {
    title: "Big Radius",
    description: "Set your diameter to 9 cells",
    icon: "filter_tilt_shift",
    price: 4500,
    tag: "radinc5",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 5, socket, 5);
    },
    cat: Cats["radius"],
  },
  {
    title: "'Damn.' Radius",
    description: "Set your diameter to 11 cells",
    icon: "filter_tilt_shift",
    price: 6000,
    tag: "radinc6",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 6, socket, 6);
    },
    cat: Cats["radius"],
  },
  {
    title: "Excessive Radius",
    description: "Set your diameter to 13 cells",
    icon: "filter_tilt_shift",
    price: 110000,
    tag: "radinc7",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 7, socket, 7);
    },
    cat: Cats["radius"],
  },
  {
    title: "Infinity Radius",
    description: "Set your diameter to 100 cells (impossible)",
    icon: "filter_tilt_shift",
    price: 64000000,
    tag: "radinc8",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 56, socket, 8);
    },
    cat: Cats["radius"],
  },
  {
    title: "Generator 2",
    description: "Upgrade your generator to 5 coins every 2 seconds",
    icon: "speed",
    price: 200,
    tag: "genspeed2",
    exec: async (_, socket, userIndex, username) => {
      upgradeGenSpeed(userIndex, username, 2000, socket, 2);
    },
    cat: Cats["gen"],
  },
  {
    title: "Generator 3",
    description: "Upgrade your generator to 10 coins every 2 seconds",
    icon: "speed",
    price: 400,
    tag: "genspeed3",
    exec: async (_, socket, userIndex, username) => {
      upgradeGenSpeed(userIndex, username, 2000, socket, 3);
      upgradeGenAmount(userIndex, username, 10, socket, 3);
    },
    cat: Cats["gen"],
  },
  {
    title: "Generator 4",
    description: "Upgrade your generator to 15 coins every 2 seconds",
    icon: "speed",
    price: 700,
    tag: "genspeed4",
    exec: async (_, socket, userIndex, username) => {
      upgradeGenAmount(userIndex, username, 15, socket, 4);
      upgradeGenSpeed(userIndex, username, 2000, socket, 4);
    },
    cat: Cats["gen"],
  },
  {
    title: "Generator 5",
    description: "Upgrade your generator to 80 coins every 2 seconds",
    icon: "speed",
    price: 1050,
    tag: "genspeed5",
    exec: async (_, socket, userIndex, username) => {
      upgradeGenAmount(userIndex, username, 80, socket, 5);
      upgradeGenSpeed(userIndex, username, 2000, socket, 5);
    },
    cat: Cats["gen"],
  },
  {
    title: "Generator Infinity",
    description: "Upgrade your generator to 400 coins every 2 seconds",
    icon: "speed",
    price: 1000000,
    tag: "genspeed6",
    exec: async (_, socket, userIndex, username) => {
      upgradeGenAmount(userIndex, username, 400, socket, 6);
      upgradeGenSpeed(userIndex, username, 2000, socket, 6);
    },
    cat: Cats["gen"],
  },
];

export default Products;
