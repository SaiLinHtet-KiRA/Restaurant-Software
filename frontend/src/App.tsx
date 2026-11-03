import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import TabsLayout from "@/components/layout/TabsLayout";
import Home from "@/pages/Home";
import Orders from "@/pages/Orders";
import Historys from "@/pages/Historys";
import More from "@/pages/More";
import AddItem from "@/pages/AddItem";
import Order from "@/pages/Order";
import ItemManagement from "@/pages/ItemManagement";
import TableManagement from "@/pages/TableManagement";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<TabsLayout />}>
            <Route index element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<Historys />} />
            <Route path="more" element={<More />} />
          </Route>
          <Route path="item" element={<ItemManagement />} />
          <Route path="table" element={<TableManagement />} />
          <Route path="order/:number" element={<Order />} />
          <Route path="add/:type" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
