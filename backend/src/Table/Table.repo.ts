import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import TableModel, { TableDocument, Table } from "./Table.model";
import { PaginationQuery } from "./interface/Table.query.type";
import TableRepoType from "./interface/Table.repo.type";

class TableRepo implements TableRepoType {
  async get({ page, limit, taken }: PaginationQuery): Promise<TableDocument[]> {
    try {
      const Tables = await TableModel.find(
        taken ? { taken: JSON.parse(taken) } : {},
        {},
        page !== undefined && limit !== undefined
          ? { skip: page * limit, limit }
          : {},
      ).sort({ number: -1 });
      if (Tables) return Tables;
      throw new Error(`Something was wrong in TableRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount({ taken }: PaginationQuery): Promise<number> {
    try {
      return await TableModel.countDocuments(
        taken ? { taken: JSON.parse(taken) } : {},
      );
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<TableDocument> {
    try {
      const Table = await TableModel.findById(id);
      if (Table) return Table;
      throw new NotFoundError(`${id} was not found in Table Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Table): Promise<TableDocument> {
    try {
      await TableModel.init();
      const newTable = new TableModel(data);
      return await newTable.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: UpdateQuery<Table>): Promise<TableDocument> {
    try {
      const Table = await TableModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (Table) return Table;
      throw new NotFoundError(`${id} was not found in Table Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<TableDocument> {
    try {
      const Table = await TableModel.findByIdAndDelete(id);
      if (Table) return Table;
      throw new NotFoundError(`${id} was not found in Table Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new TableRepo();
