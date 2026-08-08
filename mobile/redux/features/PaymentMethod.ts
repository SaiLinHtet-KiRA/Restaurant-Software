import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PaymentMethods } from "@/constants/data";

const initialState = PaymentMethods[0].name;

const paymentMethodSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setSelected } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
