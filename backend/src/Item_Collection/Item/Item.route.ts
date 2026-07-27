import { Router } from "express";
import ItemController from "./Item.controller";
import CheckIsAdmin from "./middleware/CheckIsAdmin";
import upload from "./util/multer";

const route = Router();

route.get("/booking/:id", ItemController.getItem);
route.get("/bookings", CheckIsAdmin, ItemController.getItems);
route.post("/booking", upload.single("photo"), ItemController.createItem);
route.patch(
  "/booking/:id",
  upload.single("photo"),
  CheckIsAdmin,
  ItemController.updateItem,
);
route.delete("/booking/:id", CheckIsAdmin, ItemController.deleteItem);

export default route;
