import { lifecycleSlice } from "../../lifecycle-background/lifecycle_slice";
import { subscribeListeners } from "./listeners";
import { createStore } from "./store";

(async () => {
  const store = createStore();
  subscribeListeners(store);
  store.dispatch(lifecycleSlice.actions.initStart());
})();
