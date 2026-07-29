import { Router } from "express";
import TableController from "./Table.controller";

const route = Router();

route.get("/table", TableController.getTables);
route.post("/table", TableController.createTable);
route.delete("/table/:id", TableController.deleteTable);

export default route;
