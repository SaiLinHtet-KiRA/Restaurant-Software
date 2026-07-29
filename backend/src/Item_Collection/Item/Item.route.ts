import { Router } from "express";
import ItemController from "./Item.controller";
import upload from "./util/multer";
import SaveImage from "./middleware/vercel-storage";

const route = Router();

route.get("/item/:id", ItemController.getItem);
route.get("/items", ItemController.getItems);
route.post(
  "/item",
  upload.single("photo"),
  SaveImage,
  ItemController.createItem,
);
route.patch(
  "/item/:id",
  upload.single("photo"),
  SaveImage,
  ItemController.updateItem,
);
route.delete("/item/:id", ItemController.deleteItem);

export default route;
