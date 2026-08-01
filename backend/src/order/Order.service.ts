import { OrderDocument, Order } from "./Order.model";
import OrderRepo from "./Order.repo";
import OrderServiceType from "./interface/Order.service.type";
import { PaginationQuery } from "./interface/Order.query.type";
import { UpdateQuery } from "mongoose";

class OrderService implements OrderServiceType {
  async getOrders(
    query: PaginationQuery,
  ): Promise<{ data: OrderDocument[]; size: number }> {
    try {
      const data = await OrderRepo.get(query);
      const size = await OrderRepo.getCount();

      return { data, size };
    } catch (error) {
      throw error;
    }
  }
  async getSize(): Promise<number> {
    try {
      return await OrderRepo.getCount();
    } catch (error) {
      throw error;
    }
  }
  async getOrder(id: string): Promise<OrderDocument> {
    try {
      return await OrderRepo.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  async createOrder(data: Order): Promise<OrderDocument> {
    try {
      const newOrder = await OrderRepo.create(data);

      return newOrder;
    } catch (error) {
      throw error;
    }
  }
  async updateOrder(
    id: string,
    data: UpdateQuery<Order>,
  ): Promise<OrderDocument> {
    try {
      return await OrderRepo.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async deleteOrder(id: string): Promise<OrderDocument> {
    try {
      const deletedOrder = await OrderRepo.delete(id);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
