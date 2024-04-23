import { createListenerMiddleware } from "@reduxjs/toolkit";
import { extpay } from ".";
import { paymentSlice } from "./payment_slice";

const paymentController = createListenerMiddleware();

paymentController.startListening({
  actionCreator: paymentSlice.actions.setup,
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
