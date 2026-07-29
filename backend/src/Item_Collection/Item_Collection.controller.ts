import { Request, Response } from "express";
import {
  ItemCollection,
  ItemCollectionDocument,
} from "./Item_Collection.model";
import BookingsService from "./Item_Collection.service";
import ItemCollectionControllerType from "./interface/Item_Collection.controller.type";

class ItemCollectionController implements ItemCollectionControllerType {
  async getItemCollections(
    req: Request<null, null, null, null>,
    res: Response<{ message: string; data: ItemCollectionDocument[] }>,
  ): Promise<void> {
    try {
      const Bookings = await BookingsService.getItemCollections();

      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
  async createItemCollection(
    req: Request<null, null, ItemCollection, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void> {
    try {
      const body = req.body;
      const Bookings = await BookingsService.createItemCollection(body);

      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
  async deleteItemCollection(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Bookings = await BookingsService.deleteItemCollection(id);
      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
  async updateItemCollection(
    req: Request<{ id: string }, null, ItemCollection, null>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const Bookings = await BookingsService.updateItemCollection(id, data);

      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemCollectionController();
