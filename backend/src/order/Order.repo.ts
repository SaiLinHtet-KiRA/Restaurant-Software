import { UpdateQuery } from "mongoose";
import { NotFoundError } from "../util/error/errors";
import OrderModel, { OrderDocument, Order } from "./Order.model";
import { PaginationQuery } from "./interface/Order.query.type";
import OrderRepoType from "./interface/Order.repo.type";

class OrderRepo implements OrderRepoType {
  async get({ page, limit }: PaginationQuery): Promise<OrderDocument[]> {
    try {
      const Orders = await OrderModel.find(
        {},
        {},
        page !== undefined && limit !== undefined
          ? { skip: page * limit, limit }
          : {},
      ).sort({ id: -1 });
      if (Orders) return Orders;
      throw new Error(`Something was wrong in OrderRepo.get`);
    } catch (error) {
      throw error;
    }
  }
  async getCount(): Promise<number> {
    try {
      return await OrderModel.countDocuments();
    } catch (error) {
      throw error;
    }
  }
  async getByID(id: string): Promise<OrderDocument> {
    try {
      const Order = await OrderModel.findById(id);
      if (Order) return Order;
      throw new NotFoundError(`${id} was not found in Order Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async create(data: Order): Promise<OrderDocument> {
    try {
      await OrderModel.init();
      const newOrder = new OrderModel(data);
      return await newOrder.save();
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: UpdateQuery<Order>): Promise<OrderDocument> {
    try {
      const Order = await OrderModel.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (Order) return Order;
      throw new NotFoundError(`${id} was not found in Order Database!!!`);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<OrderDocument> {
    try {
      const Order = await OrderModel.findByIdAndDelete(id);
      if (Order) return Order;
      throw new NotFoundError(`${id} was not found in Order Database!!!`);
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderRepo();
