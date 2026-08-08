import { Router } from "express";
import HistoryController from "./History.controller";

const route = Router();

route.get("/historys", HistoryController.getHistorys);
route.post("/history", HistoryController.createHistory);
route.get("/history/:id", HistoryController.getHistory);
route.patch("/history/:id", HistoryController.updateHistory);
route.delete("/history/:id", HistoryController.deleteHistory);

export default route;
