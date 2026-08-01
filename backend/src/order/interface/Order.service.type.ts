import { UpdateQuery } from "mongoose";
import { Order, OrderDocument } from "../Order.model";
import { PaginationQuery } from "./Order.query.type";

export default interface OrderServiceType {
  getOrders(
    query: PaginationQuery,
  ): Promise<{ data: OrderDocument[]; size: number }>;
  getSize(): Promise<number>;
  getOrder(id: string): Promise<OrderDocument>;
  createOrder(data: Order): Promise<OrderDocument>;
  updateOrder(id: string, data: UpdateQuery<Order>): Promise<OrderDocument>;
  deleteOrder(id: string): Promise<OrderDocument>;
}
