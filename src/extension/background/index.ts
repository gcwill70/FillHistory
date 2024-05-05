import { lifecycleSlice } from "../../lifecycle-background/lifecycle_slice";
import { createStore } from "./store";

(async () => {
  const store = createStore();
  store.dispatch(lifecycleSlice.actions.initStart());
})();
