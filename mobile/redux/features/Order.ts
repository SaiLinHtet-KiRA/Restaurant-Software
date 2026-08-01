import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Order from "@/interface/Order";
import Item from "@/interface/Item";

const initialState: Order = {
  eatIn: [],
  price: 0,
  table: "0",
  takeAway: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>) {
      state = action.payload;
    },
    addEatIn(state, action: PayloadAction<Item>) {
      state?.eatIn.push(action.payload);
    },
    addTakeAway(state, action: PayloadAction<Item>) {
      state?.takeAway.push(action.payload);
    },
    removeEatIn(state, action: PayloadAction<number>) {
      state?.eatIn.splice(action.payload, 1);
    },
    removeTakeAway(state, action: PayloadAction<number>) {
      state?.takeAway.splice(action.payload, 1);
    },
    clearOrder(state) {
      state = initialState;
    },
  },
});

export const {
  setOrder,
  addEatIn,
  addTakeAway,
  removeEatIn,
  removeTakeAway,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
