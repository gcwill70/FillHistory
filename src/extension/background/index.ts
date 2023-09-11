import { wrapStore } from "webext-redux";
import { createStore } from "../../core";
import { paymentSlice } from "../../payment/payment-slice";
import { subscribeListeners } from "./listeners";

export * from "./listeners";
export * from "./persist-state";

(async () => {
  const store = createStore();
  wrapStore(store);
  subscribeListeners(store);
  store.dispatch(paymentSlice.actions.setup());
})();
