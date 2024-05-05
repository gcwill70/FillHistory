import { createStore } from "../store";
import { activeElementListener } from "./active_element_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  activeElementListener(store);
}
