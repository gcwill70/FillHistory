import { wrapStore } from "webext-redux";
import { createStore } from "../../core";
import { subscribeListeners } from "./listeners";
import { log } from "../../core/logging";

export * from "./listeners";
export * from "./persist-state";

(async () => {
  log("starting background script");

  const state = undefined; //await getState();
  const store = createStore(state);

  wrapStore(store);

  // store.subscribe(() => {
  //   saveState();
  // });

  subscribeListeners(store);
})();
