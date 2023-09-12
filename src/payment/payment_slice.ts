import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./model";

export interface PaymentState {
  user: User;
}

const initial: PaymentState = {
  user: {
    paid: false,
  },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState: initial,
  reducers: {
    setup(state) {},
    getUser(state) {},
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    register(state) {},
    restore(state) {},
  },
});
