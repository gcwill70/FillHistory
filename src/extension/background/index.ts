import { wrapStore } from "webext-redux";
import { createStore, paymentSlice } from "../../core";
import { subscribeListeners } from "./listeners";

export * from "./listeners";
export * from "./persist-state";

(async () => {
  const store = createStore();
  wrapStore(store);
  subscribeListeners(store);
  store.dispatch(paymentSlice.actions.setup());
})();
