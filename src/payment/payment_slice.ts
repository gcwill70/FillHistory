import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./payment.types";

export interface PaymentState {
  user: User;
}

const initial: PaymentState = {
  user: {
    paid: false,
  },
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState: initial,
  reducers: {
    getUser(state) {},
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    pay(state) {},
    restore(state) {},
  },
});
