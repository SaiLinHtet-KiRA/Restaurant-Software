import { Router } from "express";
import ItemCollectionController from "./Item_Collection.controller";

const route = Router();

route.get("/item-collection", ItemCollectionController.getItemCollections);
route.post("/item-collection", ItemCollectionController.createItemCollection);
route.delete(
  "/item-collection/:id",
  ItemCollectionController.deleteItemCollection,
);
route.patch(
  "/item-collection/:id",
  ItemCollectionController.updateItemCollection,
);

export default route;
