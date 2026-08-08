import { Request, Response } from "express";
import { Order, OrderDocument } from "./Order.model";
import OrderService from "./Order.service";
import { PaginationQuery } from "./interface/Order.query.type";
import OrderControllerType from "./interface/Order.controller.type";

class OrderController implements OrderControllerType {
  async getOrders(
    req: Request<null, null, null, PaginationQuery>,
    res: Response<{
      message: string;
      data?: OrderDocument[];
      size: number;
    }>,
  ): Promise<void> {
    try {
      const query = req.query;
      const data = await OrderService.getOrders(query);
      res.status(200).json({ message: "Orders fetched successfully", ...data });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message, size: 0 });
    }
  }
  async getOrder(
    req: Request<{ id: string }, null, null, PaginationQuery>,
    res: Response<{
      message: string;
      data?: OrderDocument;
    }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data = await OrderService.getOrder(id);
      res.status(200).json({ message: "Orders fetched successfully", data });
    } catch (error) {
      throw error;
    }
  }
  async createOrder(
    req: Request<null, null, Order, null>,
    res: Response<{ message: string; data?: OrderDocument }>,
  ): Promise<void> {
    try {
      const OrderData = req.body;
      const Order = await OrderService.createOrder(OrderData);
      res
        .status(200)
        .json({ message: "Order created successfully", data: Order });
    } catch (error) {
      throw error;
    }
  }
  async updateOrder(
    req: Request<{ id: string }, null, Order, null>,
    res: Response<{ message: string; data?: OrderDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const OrderData = req.body;
      const Order = await OrderService.updateOrder(id, OrderData);
      res
        .status(200)
        .json({ message: "Order created successfully", data: Order });
    } catch (error) {
      throw error;
    }
  }
  async deleteOrder(
    req: Request<{ id: string }, null, null, null>,
    res: Response<{ message: string; data?: OrderDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Order = await OrderService.deleteOrder(id);
      res
        .status(200)
        .json({ message: "Order deleted successfully", data: Order });
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderController();
