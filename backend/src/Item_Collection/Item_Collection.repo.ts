import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import ItemModel from "./Item/Item.model";
import ItemCollectionModel, {
  ItemCollection,
  ItemCollectionDocument,
} from "./Item_Collection.model";
import ItemCollectionRepoType from "./interface/Item_Collection.repo.type";

class ItemCollectionRepo implements ItemCollectionRepoType {
  async get(): Promise<ItemCollectionDocument[]> {
    try {
      const ItemCollection = await ItemCollectionModel.find().populate({
        path: "items",
        model: ItemModel,
        options: {
          sort: { createdAt: -1 },
        },
      });
      if (ItemCollection) return ItemCollection;
      throw new Error(`Something was wrong in ItemCollectionRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<ItemCollectionDocument> {
    try {
      const ItemCollection = await ItemCollectionModel.findById(id).populate({
        path: "items",
        model: ItemModel,
        options: { sort: { createdAt: -1 } },
      });
      if (ItemCollection) return ItemCollection;
      throw new NotFoundError(
        `${id} was not found in ItemCollection Database!!!`,
      );
    } catch (error) {
      throw error;
    }
  }
  async create(data: ItemCollection): Promise<ItemCollectionDocument> {
    try {
      const newItemCollection = new ItemCollectionModel(data);
      return await newItemCollection.save();
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    data: UpdateQuery<ItemCollection>,
  ): Promise<ItemCollectionDocument> {
    try {
      const ItemCollection = await ItemCollectionModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        },
      );

      if (ItemCollection) return ItemCollection;
      throw new NotFoundError(
        `${id} was not found in ItemCollection Database!!!`,
      );
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<ItemCollectionDocument> {
    try {
      const ItemCollection = await ItemCollectionModel.findByIdAndDelete(id);
      if (ItemCollection) return ItemCollection;
      throw new NotFoundError(
        `${id} was not found in ItemCollection Database!!!`,
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemCollectionRepo();
