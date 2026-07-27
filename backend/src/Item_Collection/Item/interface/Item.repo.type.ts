import { UpdateQuery } from "mongoose";
import { Item, ItemDocument } from "../Item.model";

export default interface ItemRepoType {
  get(): Promise<ItemDocument[]>;
  getCount(): Promise<number>;
  getByID(id: string): Promise<ItemDocument>;
  create(data: Item): Promise<ItemDocument>;
  update(id: string, data: UpdateQuery<Item>): Promise<ItemDocument>;
  delete(id: string): Promise<ItemDocument>;
}
