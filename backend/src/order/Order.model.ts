import mongoose, { Schema, HydratedDocument } from "mongoose";
import { getNextSequence } from "../helper/Counter";
import { ItemSchema, Item } from "../Item_Collection/Item/Item.model";
import z from "zod";

const OrderItemSchema = ItemSchema.extend({
  count: z.number().min(1).default(1),
});

export const OrderSchema = z.object({
  table: z.string(),
  price: z.number(),
  eatIn: z.array(OrderItemSchema),
  takeAway: z.array(OrderItemSchema),
});

export type Order = z.infer<typeof OrderSchema>;

export type OrderDocument = HydratedDocument<Order & { number: number }>;

type ItemWithCount = Item & { count: number };

const ItemSubSchema = new Schema<ItemWithCount>(
  {
    name: { type: String, required: true },
    photo_url: { type: String },
    price: { type: Number, required: true, min: 0 },
    item_collection: { type: Schema.Types.ObjectId, required: true },
    count: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false },
);

const DSchema = new Schema<OrderDocument>(
  {
    number: { type: Number, min: 1, unique: true },
    table: { type: String, required: true },
    price: { type: Number, required: true },
    eatIn: { type: [ItemSubSchema], default: [] },
    takeAway: { type: [ItemSubSchema], default: [] },
  },
  { versionKey: false, timestamps: true },
);

DSchema.pre("save", async function () {
  if (this.isNew) {
    this.number = (await getNextSequence("OrderId"))!;
  }
});

const OrderModel = mongoose.connection.useDb("Order").model("Order", DSchema);

export default OrderModel;
