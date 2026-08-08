import { Router } from "express";
import TableRoute from "../Table/Table.route";
import Item_CollectionsRoute from "../Item_Collection/Item_Collection.route";
import ItemRoute from "../Item_Collection/Item/Item.route";
import OrderRoute from "../order/Order.route";
import HistoryRoute from "../history/History.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json("all good").status(200);
});

router.use(TableRoute);
router.use(Item_CollectionsRoute);
router.use(ItemRoute);
router.use(OrderRoute);
router.use(HistoryRoute);

export default router;
