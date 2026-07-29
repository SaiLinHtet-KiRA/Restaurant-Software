import Item from "./Item";

export default interface ItemCollection {
  _id: string;
  name: string;
  size: number;
  items: Item[];
}
