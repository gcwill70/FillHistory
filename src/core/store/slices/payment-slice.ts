import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../payment/model";

export interface PaymentState {
  user: User;
}

const initialPaymentState: PaymentState = {
  user: {
    paid: false,
  },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState: initialPaymentState,
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
