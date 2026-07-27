import { UpdateQuery } from "mongoose";
import {
  ItemCollection,
  ItemCollectionDocument,
} from "../Item_Collection.model";

export default interface ItemCollectionRepoType {
  get(): Promise<ItemCollectionDocument[]>;
  getByID(id: string): Promise<ItemCollectionDocument>;
  create(data: ItemCollection): Promise<ItemCollectionDocument>;
  update(
    id: string,
    data: UpdateQuery<ItemCollection>,
  ): Promise<ItemCollectionDocument>;
  delete(id: string): Promise<ItemCollectionDocument>;
}
