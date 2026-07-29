import { Router } from "express";
import AuthRoute from "../User/Auth/Auth.route";
import TableRoute from "../Table/Table.route";
import UserRoute from "../User/User.route";
import Item_CollectionsRoute from "../Item_Collection/Item_Collection.route";
import ItemRoute from "../Item_Collection/Item/Item.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json("all good").status(200);
});

router.use(TableRoute);
router.use(UserRoute);
router.use(AuthRoute);
router.use(Item_CollectionsRoute);
router.use(ItemRoute);

export default router;
