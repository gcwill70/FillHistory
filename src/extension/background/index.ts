import { wrapStore } from "webext-redux";
import { createStore } from "../../core";
import { paymentSlice } from "../../payment/payment_slice";
import { subscribeListeners } from "./listeners";

export * from "./listeners";
export * from "./persist_state";

(async () => {
  const store = createStore();
  wrapStore(store);
  subscribeListeners(store);
  store.dispatch(paymentSlice.actions.setup());
})();
