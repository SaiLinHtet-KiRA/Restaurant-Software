import { HistoryDocument, History } from "./History.model";
import HistoryRepo from "./History.repo";
import HistoryServiceType from "./interface/History.service.type";
import { PaginationQuery } from "./interface/History.query.type";
import { UpdateQuery } from "mongoose";
import OrderService from "../order/Order.service";

class HistoryService implements HistoryServiceType {
  async getHistorys(
    query: PaginationQuery,
  ): Promise<{ data: HistoryDocument[]; size: number }> {
    try {
      const data = await HistoryRepo.get(query);
      const size = await HistoryRepo.getCount();

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(): Promise<number> {
    try {
      return await HistoryRepo.getCount();
    } catch (error) {
      throw error;
    }
  }
  async getHistory(id: string): Promise<HistoryDocument> {
    try {
      return await HistoryRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  async createHistory(data: History): Promise<HistoryDocument> {
    try {
      const newHistory = await HistoryRepo.create(data);
      if (data._id) await OrderService.deleteOrder(data._id!);
      return newHistory;
    } catch (error) {
      throw error;
    }
  }
  async updateHistory(
    id: string,
    data: UpdateQuery<History>,
  ): Promise<HistoryDocument> {
    try {
      return await HistoryRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteHistory(id: string): Promise<HistoryDocument> {
    try {
      const deletedHistory = await HistoryRepo.delete(id);
      return deletedHistory;
    } catch (error) {
      throw error;
    }
  }
}

export default new HistoryService();
