import mongoose, { Schema, HydratedDocument } from "mongoose";
import { Item } from "../Item_Collection/Item/Item.model";
import z from "zod";
import { OrderSchema } from "../order/Order.model";
import { getNextSequence } from "../helper/Counter";

export const HistorySchema = OrderSchema.extend({
  paymentMethod: z.string(),
});

export type History = z.infer<typeof HistorySchema> & {
  _id: string;
};

export type HistoryDocument = HydratedDocument<History & { id: number }>;

type ItemWithCount = Item & { count: number };

const ItemSubSchema = new Schema<ItemWithCount>({
  name: { type: String, required: true },
  photo_url: { type: String },
  price: { type: Number, required: true, min: 0 },
  item_collection: { type: Schema.Types.ObjectId, required: true },
  count: { type: Number, required: true, min: 1, default: 1 },
});

const DSchema = new Schema<HistoryDocument>(
  {
    id: { type: Number, min: 1, unique: true },
    paymentMethod: { type: String, required: true },
    table: { type: String, required: true },
    price: { type: Number, required: true },
    eatIn: { type: [ItemSubSchema], default: [] },
    takeAway: { type: [ItemSubSchema], default: [] },
  },
  { versionKey: false, timestamps: true },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    this.id = (await getNextSequence("HistoryId"))!;
  }
});

const HistoryModel = mongoose.connection
  .useDb("History")
  .model("History", DSchema);

export default HistoryModel;
