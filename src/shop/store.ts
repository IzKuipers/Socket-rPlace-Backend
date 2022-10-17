import { ShopItem } from "./interface";
import { buyRadius } from "./radius";

const Products: ShopItem[] = [
  {
    title: "Meh Radius",
    description: "Set your diameter to 3 cells",
    icon: "filter_tilt_shift",
    price: 100,
    tag: "radinc2",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 2, socket);
    },
  },
  {
    title: "Mild Radius",
    description: "Set your diameter to 7 cells",
    icon: "filter_tilt_shift",
    price: 300,
    tag: "radinc4",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 4, socket);
    },
  },
  {
    title: "Big Radius",
    description: "Set your diameter to 9 cells",
    icon: "filter_tilt_shift",
    price: 4500,
    tag: "radinc5",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 5, socket);
    },
  },
  {
    title: "'Damn.' Radius",
    description: "Set your diameter to 11 cells",
    icon: "filter_tilt_shift",
    price: 6000,
    tag: "radinc6",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 6, socket);
    },
  },
  {
    title: "Excessive Radius",
    description: "Set your diameter to 13 cells",
    icon: "filter_tilt_shift",
    price: 110000,
    tag: "radinc7",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 7, socket);
    },
  },
  {
    title: "Infinity Radius",
    description: "Set your diameter to 100 cells (impossible)",
    icon: "filter_tilt_shift",
    price: 640000000000,
    tag: "radinc56",
    exec: async (_, socket, userIndex, username) => {
      buyRadius(username, userIndex, 56, socket);
    },
  },
];

export default Products;
