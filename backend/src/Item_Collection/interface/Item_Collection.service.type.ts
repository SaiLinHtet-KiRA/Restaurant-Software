import { UpdateQuery } from "mongoose";
import {
  ItemCollection,
  ItemCollectionDocument,
} from "../Item_Collection.model";

export default interface ItemCollectionServiceType {
  getItemCollections(): Promise<ItemCollectionDocument[]>;
  getItemCollection(ID: string): Promise<ItemCollectionDocument>;
  createItemCollection(data: ItemCollection): Promise<ItemCollectionDocument>;
  updateItemCollection(
    id: string,
    data: UpdateQuery<ItemCollection>,
  ): Promise<ItemCollectionDocument>;
  deleteItemCollection(id: string): Promise<ItemCollectionDocument>;
}
