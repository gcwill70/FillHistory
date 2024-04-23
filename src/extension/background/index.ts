import { paymentSlice } from "../../payment/payment_slice";
import { subscribeListeners } from "./listeners";
import { createStore } from "./store/create_store";

export * from "./listeners";
export * from "./persist_state";

(async () => {
  const store = createStore();
  subscribeListeners(store);
  store.dispatch(paymentSlice.actions.setup());
})();
