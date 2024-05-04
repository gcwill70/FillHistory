import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { paymentSlice } from "./payment_slice";
import ExtPay from "extpay";

const extpay = ExtPay("fillhistory");

const paymentController = createListenerMiddleware();

paymentController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    extpay.startBackground();
  },
});

paymentController.startListening({
  actionCreator: paymentSlice.actions.getUser,
  effect: (action, api) => {
    extpay.getUser().then((user) => {
      api.dispatch(paymentSlice.actions.setUser({ paid: user.paid }));
    });
  },
});

paymentController.startListening({
  actionCreator: paymentSlice.actions.pay,
  effect: (action, api) => {
    extpay.openPaymentPage();
  },
});

paymentController.startListening({
  actionCreator: paymentSlice.actions.restore,
  effect: (action, api) => {
    extpay.openLoginPage();
  },
});

export default paymentController;
