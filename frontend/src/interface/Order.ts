import type Item from "./Item";

export default interface Order {
  _id?: string;
  table: string;
  price: number;
  eatIn: Item[];
  takeAway: Item[];
  id?: number;
}
