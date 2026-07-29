import { Request, Response } from "express";
import { Item, ItemDocument } from "./Item.model";
import ItemControllerType from "./interface/Item.controller.type";
import ItemService from "./Item.service";

class ItemController implements ItemControllerType {
  async getItems(
    req: Request<Record<string, never>, null, null, null>,
    res: Response<{ message: string; data: ItemDocument[]; size: number }>,
  ): Promise<void> {
    try {
      const data = await ItemService.getItems();

      res.status(200).json({ message: "Item retrieved successfully", ...data });
    } catch (error) {
      throw error;
    }
  }
  async getItem(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Item = await ItemService.getItem(id);

      res
        .status(200)
        .json({ message: "Item retrieved successfully", data: Item });
    } catch (error) {
      throw error;
    }
  }
  async updateItem(
    req: Request<{ id: string }, unknown, Item, unknown>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const Item = await ItemService.updateItem(id, body);

      res
        .status(200)
        .json({ message: "Item retrieved successfully", data: Item });
    } catch (error) {
      throw error;
    }
  }
  async createItem(
    req: Request<unknown, unknown, Item, unknown>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void> {
    try {
      const body = req.body;
      console.log(body);
      const Item = await ItemService.createItem(body);

      res
        .status(200)
        .json({ message: "Item retrieved successfully", data: Item });
    } catch (error) {
      throw error;
    }
  }
  async deleteItem(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data: ItemDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Item = await ItemService.deleteItem(id);

      res
        .status(200)
        .json({ message: "Item retrieved successfully", data: Item });
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemController();
