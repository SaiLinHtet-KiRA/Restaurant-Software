import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import HistoryModel, { HistoryDocument, History } from "./History.model";
import { PaginationQuery } from "./interface/History.query.type";
import HistoryRepoType from "./interface/History.repo.type";

class HistoryRepo implements HistoryRepoType {
  async get({ page, limit }: PaginationQuery): Promise<HistoryDocument[]> {
    try {
      const Historys = await HistoryModel.find(
        {},
        {},
        page !== undefined && limit !== undefined
          ? { skip: page * limit, limit }
          : {},
      ).sort({ createdAt: -1 });
      if (Historys) return Historys;
      throw new Error(`Something was wrong in HistoryRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount(): Promise<number> {
    try {
      return await HistoryModel.countDocuments();
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<HistoryDocument> {
    try {
      const History = await HistoryModel.findById(id);
      if (History) return History;
      throw new NotFoundError(`${id} was not found in History Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: History): Promise<HistoryDocument> {
    try {
      await HistoryModel.init();
      const newHistory = new HistoryModel(data);
      return await newHistory.save();
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    data: UpdateQuery<History>,
  ): Promise<HistoryDocument> {
    try {
      const History = await HistoryModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (History) return History;
      throw new NotFoundError(`${id} was not found in History Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<HistoryDocument> {
    try {
      const History = await HistoryModel.findByIdAndDelete(id);
      if (History) return History;
      throw new NotFoundError(`${id} was not found in History Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new HistoryRepo();
