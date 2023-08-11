import { createStore } from "../../../core";
import { activeElementListener } from "./active-element-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  activeElementListener(store);
}
