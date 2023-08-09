import { createStore } from "../../../core";
import { commandListener } from "./command-listener";
import { setTabListener } from "./set-tab-listener";

export * from "./command-listener";
export * from "./set-tab-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  setTabListener(store);
  commandListener(store);
}
