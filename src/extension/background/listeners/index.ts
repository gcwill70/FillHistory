import { createStore } from "../store";
import { runtimeListener } from "./runtime_listener";
import { setTabListener } from "./tab_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  setTabListener(store);
  runtimeListener(store);
}
