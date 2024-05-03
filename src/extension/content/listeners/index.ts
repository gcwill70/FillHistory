import { createStore } from "../store";
import { activeElementListener } from "./active_element_listener";
import { keydownListener } from "./keydown_listener";
import { runtimeListener } from "./runtime_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  runtimeListener(store);
  activeElementListener(store);
  keydownListener(store);
}
