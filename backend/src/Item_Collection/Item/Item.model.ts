import mongoose, { Schema, HydratedDocument, Types } from "mongoose";
import { z } from "zod";

import { getNextSequence } from "../../helper/Counter";

export const ItemSchema = z.object({
  name: z.string("Name Field is missig"),
  photo_url: z.string("Photo Url must be string").optional(),
  price: z.coerce.number("Price Field is missing").min(0),
  item_collection: z.any().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
});

export type Item = z.infer<typeof ItemSchema>;

export type ItemDocument = HydratedDocument<
  Item & {
    id: number;
  }
>;

const DSchema = new Schema<ItemDocument>(
  {
    id: { type: Number },
    name: { type: String, required: true },
    photo_url: { type: String },
    price: { type: Number, required: true, min: 0 },
    item_collection: { type: Schema.ObjectId, require: true },
  },
  { versionKey: false, timestamps: true },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    this.id = (await getNextSequence("ItemId"))!;
  }
});

const ItemModel = mongoose.connection
  .useDb("Item")
  .model<ItemDocument>("Item", DSchema);

export default ItemModel;
