import { createStore } from "../../../core";
import { activeElementListener } from "./active-element-listener";
import { messageListener } from "./message-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  messageListener(store);
  activeElementListener(store);
}
