import {
  ItemCollectionDocument,
  ItemCollection,
  ItemCollectionSchema,
} from "./Item_Collection.model";
import ItemCollectionRepo from "./Item_Collection.repo";
import ItemCollectionServiceType from "./interface/Items_Collection.service.type";
import { validateZod } from "../util/validate";
import { UpdateQuery } from "mongoose";

class ItemCollectionService implements ItemCollectionServiceType {
  async getItemCollection(): Promise<ItemCollectionDocument[]> {
    try {
      const ItemCollections = await ItemCollectionRepo.get();
      return ItemCollections;
    } catch (error) {
      throw error;
    }
  }
  async getBooking(id: string): Promise<ItemCollectionDocument> {
    try {
      return await ItemCollectionRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  async createItemCollection(
    data: ItemCollection,
  ): Promise<ItemCollectionDocument> {
    try {
      const ItemCollectionData = validateZod(ItemCollectionSchema, data);

      const newItemCollection =
        await ItemCollectionRepo.create(ItemCollectionData);

      return newItemCollection;
    } catch (error) {
      throw error;
    }
  }
  async updateItemCollection(
    id: string,
    data: UpdateQuery<ItemCollection>,
  ): Promise<ItemCollectionDocument> {
    try {
      return await ItemCollectionRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteItemCollection(id: string): Promise<ItemCollectionDocument> {
    try {
      return await ItemCollectionRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemCollectionService();
