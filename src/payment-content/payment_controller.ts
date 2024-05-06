import { createListenerMiddleware } from "@reduxjs/toolkit";
import ExtPay from "extpay";
import { paymentSlice } from "../payment/payment_slice";

const extpay = ExtPay("fillhistory");

const paymentController = createListenerMiddleware();

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
