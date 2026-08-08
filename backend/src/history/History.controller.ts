import { Request, Response } from "express";
import { History, HistoryDocument } from "./History.model";
import HistoryService from "./History.service";
import { PaginationQuery } from "./interface/History.query.type";
import HistoryControllerType from "./interface/History.controller.type";

class HistoryController implements HistoryControllerType {
  async getHistorys(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{
      message: string;
      data?: HistoryDocument[];
      size: number;
    }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await HistoryService.getHistorys(query);
      res
        .status(200)
        .json({ message: "Historys fetched successfully", ...data });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message, size: 0 });
    }
  }
  async getHistory(
    req: Request<{ id: string }, null, null, PaginationQuery>,
    res: Response<{
      message: string;
      data?: HistoryDocument;
    }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data = await HistoryService.getHistory(id);
      res.status(200).json({ message: "Historys fetched successfully", data });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
  async createHistory(
    req: Request<null, null, History, null>,
    res: Response<{ message: string; data?: HistoryDocument }>,
  ): Promise<void> {
    try {
      const HistoryData = req.body;
      const History = await HistoryService.createHistory(HistoryData);
      res
        .status(200)
        .json({ message: "History created successfully", data: History });
    } catch (error) {
      const err = error as Error & { status?: number };
      res.status(err.status || 400).json({ message: err.message });
    }
  }
  async updateHistory(
    req: Request<{ id: string }, null, History, null>,
    res: Response<{ message: string; data?: HistoryDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const HistoryData = req.body;
      const History = await HistoryService.updateHistory(id, HistoryData);
      res
        .status(200)
        .json({ message: "History created successfully", data: History });
    } catch (error) {
      const err = error as Error & { status?: number };
      res.status(err.status || 400).json({ message: err.message });
    }
  }
  async deleteHistory(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data?: HistoryDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const History = await HistoryService.deleteHistory(id);
      res
        .status(200)
        .json({ message: "History deleted successfully", data: History });
    } catch (error) {
      const err = error as Error;
      res.status(404).json({ message: err.message });
    }
  }
}

export default new HistoryController();
