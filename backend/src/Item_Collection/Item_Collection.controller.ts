import { Request, Response } from "express";
import { ItemCollectionDocument } from "./Item_Collection.model";
import BookingsService from "./Item_Collection.service";
import BookingsControllerType from "./interface/Items_Collection.controller.type";

class BookingsController implements BookingsControllerType {
  async getBookings(
    req: Request<{ id: string }>,
    res: Response<{ message: string; data: ItemCollectionDocument }>,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const Bookings = await BookingsService.getBooking(id);

      res
        .status(200)
        .json({ message: "Bookings retrieved successfully", data: Bookings });
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingsController();
