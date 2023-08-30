import { createStore } from "../../../core";
import { activeElementListener } from "./active-element-listener";
import { keydownListener } from "./keydown-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  activeElementListener(store);
  keydownListener(store);
}
