import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { PaymentMethods } from "@/constants/data";

const initialState = PaymentMethods[0].name;

const paymentMethodSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelected(_state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setSelected } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
