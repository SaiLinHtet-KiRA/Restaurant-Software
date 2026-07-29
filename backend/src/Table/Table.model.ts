import mongoose, { Schema, HydratedDocument } from "mongoose";
import { getNextSequence } from "../helper/Counter";

export type Table = {
  number: number;
  taken: boolean;
};

export type TableDocument = HydratedDocument<Table>;

const DSchema = new Schema<TableDocument>(
  {
    number: { type: Number, min: 1, unique: true },
    taken: { type: Boolean, default: false },
  },
  { versionKey: false },
);
DSchema.pre("save", async function () {
  if (this.isNew) {
    this.number = (await getNextSequence("TableId"))!;
  }
});
const TableModel = mongoose.connection.useDb("Table").model("Table", DSchema);

export default TableModel;
