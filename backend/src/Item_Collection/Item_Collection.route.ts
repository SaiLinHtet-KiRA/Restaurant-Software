import { Router } from "express";
import RatingsController from "./Item_Collection.controller";

const route = Router();

route.get("/items-collection", RatingsController.getBookings);

export default route;
