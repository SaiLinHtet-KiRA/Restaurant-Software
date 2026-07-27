import { ItemDocument, Item, ItemSchema } from "./Item.model";
import ItemRepo from "./Item.repo";
import ItemServiceType from "./interface/Item.service.type";
import { validateZod } from "../../util/validate";
import { UpdateQuery } from "mongoose";
import Item_CollectionService from "../Item_Collection.service";

class ItemService implements ItemServiceType {
  async getItems(): Promise<{ data: ItemDocument[]; size: number }> {
    try {
      const data = await ItemRepo.get();
      const size = await this.getSize();

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(): Promise<number> {
    try {
      return await ItemRepo.getCount();
    } catch (error) {
      throw error;
    }
  }
  async getItem(id: string): Promise<ItemDocument> {
    try {
      return await ItemRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }
  async createItem(data: Item): Promise<ItemDocument> {
    try {
      const ItemData = validateZod(ItemSchema, data);

      const newItem = await ItemRepo.create(ItemData);
      await Item_CollectionService.updateItemCollection(
        newItem.item_collection,
        {
          $push: { items: newItem._id },
          $inc: { size: 1 },
        },
      );

      return newItem;
    } catch (error) {
      throw error;
    }
  }
  async updateItem(id: string, data: UpdateQuery<Item>): Promise<ItemDocument> {
    try {
      const ItemData = validateZod(ItemSchema.partial(), data);

      return await ItemRepo.update(id, ItemData);
    } catch (error) {
      throw error;
    }
  }
  async deleteItem(id: string): Promise<ItemDocument> {
    try {
      const deletedItem = await ItemRepo.delete(id);

      await Item_CollectionService.updateItemCollection(
        deletedItem.item_collection,
        {
          $pull: { items: deletedItem._id },
          $inc: { size: -1 },
        },
      );

      return deletedItem;
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemService();
