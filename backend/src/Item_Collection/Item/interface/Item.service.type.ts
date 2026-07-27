import { UpdateQuery } from "mongoose";
import { Item, ItemDocument } from "../Item.model";

export default interface ItemServiceType {
  getItems(): Promise<{ data: ItemDocument[]; size: number }>;
  getSize(): Promise<number>;
  getItem(ID: string): Promise<ItemDocument>;
  createItem(data: Item): Promise<ItemDocument>;
  updateItem(id: string, data: UpdateQuery<Item>): Promise<ItemDocument>;
  deleteItem(id: string): Promise<ItemDocument>;
}
