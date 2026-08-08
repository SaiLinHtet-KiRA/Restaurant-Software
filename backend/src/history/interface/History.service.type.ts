import { UpdateQuery } from "mongoose";
import { History, HistoryDocument } from "../History.model";
import { PaginationQuery } from "./History.query.type";

export default interface HistoryServiceType {
  getHistorys(
    query: PaginationQuery,
  ): Promise<{ data: HistoryDocument[]; size: number }>;
  getSize(): Promise<number>;
  getHistory(id: string): Promise<HistoryDocument>;
  createHistory(data: History): Promise<HistoryDocument>;
  updateHistory(
    id: string,
    data: UpdateQuery<History>,
  ): Promise<HistoryDocument>;
  deleteHistory(id: string): Promise<HistoryDocument>;
}
