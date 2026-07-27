import { Request, Response } from "express";
import { Item, ItemDocument } from "../Item.model";

export default interface ItemControllerType {
  getItems(
    req: Request<Record<string, never>, null, null, null>,
    res: Response<{ message: string; data: ItemDocument[]; size: number }>,
  ): Promise<void>;
  getItem(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void>;
  updateItem(
    req: Request<{ id: string }, unknown, Item, unknown>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void>;
  createItem(
    req: Request<unknown, unknown, Item, unknown>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void>;
  deleteItem(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void>;
}
