import { UpdateQuery } from "mongoose";
import { History, HistoryDocument } from "../History.model";
import { PaginationQuery } from "./History.query.type";

export default interface HistoryRepoType {
  get(query: PaginationQuery): Promise<HistoryDocument[]>;
  getCount(): Promise<number>;
  getByID(id: string): Promise<HistoryDocument>;
  create(data: History): Promise<HistoryDocument>;
  update(id: string, data: UpdateQuery<History>): Promise<HistoryDocument>;
  delete(id: string): Promise<HistoryDocument>;
}
