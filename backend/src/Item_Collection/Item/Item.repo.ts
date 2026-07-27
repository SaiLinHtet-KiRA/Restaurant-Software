import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../../util/error/errors";
import ItemModel, { ItemDocument, Item } from "./Item.model";
import ItemRepoType from "./interface/Item.repo.type";
import RoomModel from "../../Table/table.model";

class ItemRepo implements ItemRepoType {
  async get(): Promise<ItemDocument[]> {
    try {
      const Items = await ItemModel.find()
        .sort({ id: -1 })
        .populate({ path: "room", model: RoomModel });
      if (Items) return Items;
      throw new Error(`Something was wrong in ItemRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount(): Promise<number> {
    try {
      return await ItemModel.countDocuments();
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<ItemDocument> {
    try {
      const Item = await ItemModel.findById(id);
      if (Item) return Item;
      throw new NotFoundError(`${id} was not found in Rate Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Item): Promise<ItemDocument> {
    try {
      const newItem = new ItemModel(data);
      return await newItem.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: UpdateQuery<Item>): Promise<ItemDocument> {
    try {
      const Item = await ItemModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (Item) return Item;
      throw new NotFoundError(`${id} was not found in Item Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<ItemDocument> {
    try {
      const Item = await ItemModel.findByIdAndDelete(id);
      if (Item) return Item;
      throw new NotFoundError(`${id} was not found in Item Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemRepo();
