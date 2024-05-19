import { createListenerMiddleware } from "@reduxjs/toolkit";
import ExtPay from "extpay";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { paymentSlice } from "../payment/payment_slice";

const extpay = ExtPay("fillhistory");

const paymentController = createListenerMiddleware();

paymentController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    extpay.startBackground();
    api.dispatch(paymentSlice.actions.getUser());
  },
});

paymentController.startListening({
  actionCreator: paymentSlice.actions.getUser,
  effect: async (action, api) => {
    const user = await extpay.getUser();
    api.dispatch(paymentSlice.actions.setUser({ paid: user.paid }));
  },
});

paymentController.startListening({
  actionCreator: paymentSlice.actions.pay,
  effect: (action, api) => {
    api.dispatch(paymentSlice.actions.getUser());
  },
});

export default paymentController;
