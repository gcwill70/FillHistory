import { createStore } from "../../../core";
import { activeElementListener } from "./active_element_listener";
import { keydownListener } from "./keydown_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  activeElementListener(store);
  keydownListener(store);
}
