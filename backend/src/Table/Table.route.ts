import { Router } from "express";
import TableController from "./Table.controller";
import CanDelete from "./middleware/CheckAdmin";
import CheckAdmin from "./middleware/CheckAdmin";

const route = Router();

route.get("/room/:id", TableController.getTable);
route.get("/room", TableController.getTables);
route.post("/room", CheckAdmin, TableController.createTable);
route.patch("/room/:id", CheckAdmin, TableController.updateTable);
route.delete("/room/:id", CheckAdmin, CanDelete, TableController.deleteTable);

export default route;
