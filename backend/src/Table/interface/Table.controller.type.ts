import { Request, Response } from "express";
import { PaginationQuery } from "./Table.query.type";
import { Table, TableDocument } from "../Table.model";

export default interface TableControllerType {
  getTables(
    req: Request<Record<string, never>, unknown, unknown, PaginationQuery>,
    res: Response<{ message: string; data: TableDocument[]; size: number }>,
  ): Promise<void>;

  createTable(
    req: Request<Record<string, never>, unknown, Table>,
    res: Response<{ message: string; data: TableDocument }>,
  ): Promise<void>;
  deleteTable(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data?: Table }>,
  ): Promise<void>;
}
