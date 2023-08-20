import { wrapStore } from "webext-redux";
import { createStore } from "../../core";
import { subscribeListeners } from "./listeners";

export * from "./listeners";
export * from "./persist-state";

(async () => {
  console.log("background script");

  const state = undefined; //await getState();
  const store = createStore(state);

  wrapStore(store);

  // store.subscribe(() => {
  //   saveState();
  // });

  subscribeListeners(store);
})();
