import { createListenerMiddleware } from "@reduxjs/toolkit";
import { extpay } from ".";
import { lifecycleSlice } from "../lifecycle/lifecycle_slice";
import { paymentSlice } from "./payment_slice";

const paymentController = createListenerMiddleware();

paymentController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    console.log("payment init");
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
