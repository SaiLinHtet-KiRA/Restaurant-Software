import { Request, Response } from "express";
import { Table, TableDocument } from "./Table.model";
import TableService from "./Table.service";
import { PaginationQuery } from "./interface/Table.query.type";
import TableControllerType from "./interface/Table.controller.type";

class TableController implements TableControllerType {
  async getTables(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{
      message: string;
      data: TableDocument[] | null;
      size: number;
    }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await TableService.getTables(query);
      res.status(200).json({ message: "Tables fetched successfully", ...data });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message, data: null, size: 0 });
    }
  }

  async createTable(
    req: Request<Record<string, never>, unknown, Table>,
    res: Response<{ message: string; data: TableDocument | null }>,
  ): Promise<void> {
    try {
      const TableData = req.body;
      const Table = await TableService.createTable(TableData);
      res
        .status(200)
        .json({ message: "Table created successfully", data: Table });
    } catch (error) {
      const err = error as Error & { status?: number };
      res.status(err.status || 400).json({ message: err.message, data: null });
    }
  }

  async deleteTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data?: TableDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Table = await TableService.deleteTable(id);
      res
        .status(200)
        .json({ message: "Table deleted successfully", data: Table });
    } catch (error) {
      const err = error as Error;
      res.status(404).json({ message: err.message });
    }
  }
}

export default new TableController();
