import { Request, Response } from "express";
import { ItemCollectionDocument } from "../Item_Collection.model";

export default interface BookingsControllerType {
  getBookings(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void>;
}
