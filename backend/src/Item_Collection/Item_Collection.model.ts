import mongoose, { Schema, Types, HydratedDocument } from "mongoose";
import { z } from "zod";
import { Item } from "./Item/Item.model";

export const ItemCollectionSchema = z.object({
  name: z.string("Name Field is missing"),
  items: z
    .array(
      z.any().refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
      }),
    )
    .optional(),
});

export type ItemCollection = z.infer<typeof ItemCollectionSchema>;

export type ItemCollectionDocument = HydratedDocument<
  ItemCollection & {
    size: number;
    items: Item[];
  }
>;

const DSchema = new Schema<ItemCollectionDocument>(
  {
    name: { type: String, required: true, unique: true },
    items: { type: [Schema.ObjectId], default: [] },
    size: { type: Number, default: 0 },
  },
  { versionKey: false },
);

const ItemCollectionModel = mongoose.connection
  .useDb("ItemCollection")
  .model<ItemCollectionDocument>("ItemCollection", DSchema);

export default ItemCollectionModel;
