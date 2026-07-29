import { UpdateQuery } from "mongoose";
import { Table, TableDocument } from "../Table.model";
import { PaginationQuery } from "./Table.query.type";

export default interface TableRepoType {
  get(query: PaginationQuery): Promise<TableDocument[]>;
  getCount(query: PaginationQuery): Promise<number>;
  getByID(id: string): Promise<TableDocument>;
  create(data: Table): Promise<TableDocument>;
  update(id: string, data: UpdateQuery<Table>): Promise<TableDocument>;
  delete(id: string): Promise<TableDocument>;
}
