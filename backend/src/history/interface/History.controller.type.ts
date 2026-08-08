import { Request, Response } from "express";
import { PaginationQuery } from "./History.query.type";
import { History, HistoryDocument } from "../History.model";

export default interface HistoryControllerType {
  getHistorys(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data?: HistoryDocument[]; size: number }>,
  ): Promise<void>;
  getHistory(
    req: Request<{ id: string }, null, null, PaginationQuery>,
    res: Response<{ message: string; data?: HistoryDocument }>,
  ): Promise<void>;
  createHistory(
    req: Request<null, null, History, null>,
    res: Response<{ message: string; data?: HistoryDocument }>,
  ): Promise<void>;
  updateHistory(
    req: Request<{ id: string }, null, History, null>,
    res: Response<{ message: string; data: HistoryDocument }>,
  ): Promise<void>;
  deleteHistory(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data?: History }>,
  ): Promise<void>;
}
