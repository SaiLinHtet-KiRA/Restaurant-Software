import { Request, Response } from "express";
import {
  ItemCollection,
  ItemCollectionDocument,
} from "../Item_Collection.model";

export default interface ItemCollectionControllerType {
  getItemCollections(
    req: Request<null, null, null, null>,
    res: Response<{ message: string; data: ItemCollectionDocument[] }>,
  ): Promise<void>;
  createItemCollection(
    req: Request<null, null, ItemCollection, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void>;
  updateItemCollection(
    req: Request<{ id: string }, null, ItemCollection, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void>;
  deleteItemCollection(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void>;
}
