import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Order from "@/interface/Order";
import type Item from "@/interface/Item";

type arg = {
  type: string;
  item: Item;
};

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
    setOrderTableNo(state, action: PayloadAction<string>) {
      state.table = action.payload;
    },
    setorder(_state, action: PayloadAction<Order>) {
      return action.payload;
    },
    increaseItem(state, action: PayloadAction<arg>) {
      if (
        !state[action.payload.type == "take-away" ? "takeAway" : "eatIn"].find(
          (item) => item._id == action.payload.item._id,
        )
      ) {
        state[action.payload.type == "take-away" ? "takeAway" : "eatIn"].push({
          ...action.payload.item,
          count: 1,
        });
        return;
      }

      for (const item of state[
        action.payload.type == "take-away" ? "takeAway" : "eatIn"
      ]) {
        if (item._id == action.payload.item._id) item.count += 1;
      }
    },
    reduceItem(state, action: PayloadAction<arg>) {
      for (const item of state[
        action.payload.type == "take-away" ? "takeAway" : "eatIn"
      ]) {
        if (item._id == action.payload.item._id && item.count == 1) {
          state[action.payload.type === "take-away" ? "takeAway" : "eatIn"] =
            state[
              action.payload.type === "take-away" ? "takeAway" : "eatIn"
            ].filter(({ _id }) => _id !== action.payload.item._id);
          return;
        }

        if (item._id == action.payload.item._id && item.count > 0)
          item.count -= 1;
      }
    },
    clearOrder() {
      return initialState;
    },
  },
});

export const {
  setOrderTableNo,
  setorder,
  increaseItem,
  reduceItem,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
