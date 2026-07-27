import mongoose, { Schema, HydratedDocument } from "mongoose";
import { z } from "zod";

export const TableSchema = z.object({
  number: z.coerce
    .number({ error: "Number field is missing" })
    .min(1, { error: "Number must start from 1" }),
  status: z.enum(["available", "taken"]),
});

export type Table = z.infer<typeof TableSchema>;

export type TableDocument = HydratedDocument<Table>;

const DSchema = new Schema<TableDocument>(
  {
    number: { type: Number, min: 1, required: true },
  },
  { versionKey: false, timestamps: true },
);

const TableModel = mongoose.connection.useDb("Table").model("Table", DSchema);

export default TableModel;
