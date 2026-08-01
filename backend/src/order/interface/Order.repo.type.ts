import { UpdateQuery } from "mongoose";
import { Order, OrderDocument } from "../Order.model";
import { PaginationQuery } from "./Order.query.type";

export default interface OrderRepoType {
  get(query: PaginationQuery): Promise<OrderDocument[]>;
  getCount(): Promise<number>;
  getByID(id: string): Promise<OrderDocument>;
  create(data: Order): Promise<OrderDocument>;
  update(id: string, data: UpdateQuery<Order>): Promise<OrderDocument>;
  delete(id: string): Promise<OrderDocument>;
}
