import { Request, Response } from "express";
import { Table, TableDocument } from "./table.model";
import TableControllerType from "./interface/Table.controller.type";
import TableService from "./Table.service";
import { PaginationQuery } from "./interface/Table.query.type";

class TableController implements TableControllerType {
  async getTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Table = await TableService.getTable(id);

      res
        .status(200)
        .json({ message: "Table retrieved successfully", data: Table });
    } catch (error) {
      throw error;
    }
  }

  async getTables(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: TableDocument[]; size: number }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await TableService.getTables(query);
      res.status(200).json({ message: "Tables fetched successfully", ...data });
    } catch (error) {
      throw error;
    }
  }

  async updateTable(
    req: Request<{ id: string }, unknown, Table>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const TableData = req.body;
      const Table = await TableService.updateTable(id, TableData);
      res
        .status(200)
        .json({ message: "Table updated successfully", data: Table });
    } catch (error) {
      throw error;
    }
  }

  async createTable(
    req: Request<Record<string, never>, unknown, Table>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void> {
    try {
      const TableData = req.body;
      const Table = await TableService.createTable(TableData);
      res
        .status(200)
        .json({ message: "Table created successfully", data: Table });
    } catch (error) {
      throw error;
    }
  }

  async deleteTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Table = await TableService.deleteTable(id);

      res
        .status(200)
        .json({ message: "Table deleted successfully", data: Table });
    } catch (error) {
      throw error;
    }
  }
}

export default new TableController();
