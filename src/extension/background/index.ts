import { wrapStore } from "webext-redux";
import { createStore } from "../../core";
import { getState, saveState } from "./persist-state";
import { subscribeListeners } from "./listeners";

export * from "./listeners";
export * from "./persist-state";

(async () => {
  const state = await getState();
  const store = createStore(state);

  wrapStore(store);

  store.subscribe(() => {
    saveState(store.getState());
  });

  subscribeListeners(store);
})();
