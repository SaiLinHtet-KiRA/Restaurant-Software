import { Request, Response } from "express";
import { PaginationQuery } from "./Order.query.type";
import { Order, OrderDocument } from "../Order.model";

export default interface OrderControllerType {
  getOrders(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{ message: string; data?: OrderDocument[]; size: number }>,
  ): Promise<void>;
  getOrder(
    req: Request<{ id: string }, null, null, PaginationQuery>,
    res: Response<{ message: string; data?: OrderDocument }>,
  ): Promise<void>;
  createOrder(
    req: Request<null, null, Order, null>,
    res: Response<{ message: string; data?: OrderDocument }>,
  ): Promise<void>;
  updateOrder(
    req: Request<{ id: string }, null, Order, null>,
    res: Response<{ message: string; data: OrderDocument }>,
  ): Promise<void>;
  deleteOrder(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data?: Order }>,
  ): Promise<void>;
}
