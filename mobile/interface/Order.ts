import Item from "./Item";

export default interface Order {
  table: string;
  price: number;
  eatIn: Item[];
  takeAway: Item[];
}
