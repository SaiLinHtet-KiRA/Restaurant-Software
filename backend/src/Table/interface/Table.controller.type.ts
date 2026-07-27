import { Request, Response } from "express";
import { PaginationQuery } from "./Table.query.type";
import { Table, TableDocument } from "../table.model";

export default interface TableControllerType {
  getTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void>;
  getTables(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: TableDocument[]; size: number }>,
  ): Promise<void>;
  updateTable(
    req: Request<{ id: string }, unknown, Table>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void>;
  createTable(
    req: Request<Record<string, never>, unknown, Table>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void>;
  deleteTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: Table }>,
  ): Promise<void>;
}
