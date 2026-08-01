import { Router } from "express";
import OrderController from "./Order.controller";

const route = Router();

route.get("/orders", OrderController.getOrders);
route.post("/order", OrderController.createOrder);
route.get("/order/:id", OrderController.getOrder);
route.patch("/order/:id", OrderController.updateOrder);
route.delete("/order/:id", OrderController.deleteOrder);

export default route;
