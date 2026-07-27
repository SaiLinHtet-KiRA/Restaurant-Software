import { TableDocument, Table, TableSchema } from "./table.model";
import TableRepo from "./Table.repo";
import TableServiceType from "./interface/Table.service.type";
import { validateZod } from "../util/validate";
import { PaginationQuery } from "./interface/Table.query.type";
import { UpdateQuery } from "mongoose";

class TableService implements TableServiceType {
  async getTables(
    query: PaginationQuery,
  ): Promise<{ data: TableDocument[]; size: number }> {
    try {
      const data = await TableRepo.get(query);
      const size = await TableRepo.getCount(query);

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(query: PaginationQuery): Promise<number> {
    try {
      return await TableRepo.getCount(query);
    } catch (error) {
      throw error;
    }
  }
  async getTable(id: string): Promise<TableDocument> {
    try {
      return await TableRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  async createTable(data: Table): Promise<TableDocument> {
    try {
      const TableData = validateZod(TableSchema, data);

      const newTable = await TableRepo.create(TableData);

      return newTable;
    } catch (error) {
      throw error;
    }
  }
  async updateTable(
    id: string,
    data: UpdateQuery<Table>,
  ): Promise<TableDocument> {
    try {
      const TableData = validateZod(TableSchema.partial(), data);

      return await TableRepo.update(id, TableData);
    } catch (error) {
      throw error;
    }
  }
  async deleteTable(id: string): Promise<TableDocument> {
    try {
      const deletedTable = await TableRepo.delete(id);

      return deletedTable;
    } catch (error) {
      throw error;
    }
  }
}

export default new TableService();
