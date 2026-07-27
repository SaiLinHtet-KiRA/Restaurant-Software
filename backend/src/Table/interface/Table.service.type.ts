import { UpdateQuery } from "mongoose";
import { Table, TableDocument } from "../table.model";
import { PaginationQuery } from "./Table.query.type";

export default interface TableServiceType {
  getTables(
    query: PaginationQuery,
  ): Promise<{ data: TableDocument[]; size: number }>;
  getSize(query: PaginationQuery): Promise<number>;

  getTable(id: string): Promise<TableDocument>;
  createTable(data: Table): Promise<TableDocument>;
  updateTable(id: string, data: UpdateQuery<Table>): Promise<TableDocument>;
  deleteTable(id: string): Promise<TableDocument>;
}
