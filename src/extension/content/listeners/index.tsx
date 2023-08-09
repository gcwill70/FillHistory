import { createStore } from "../../../core";
import { messageListener } from "./message-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  messageListener(store);
}
