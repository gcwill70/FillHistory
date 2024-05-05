import { createStore } from "../store";
import { runtimeListener } from "./runtime_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  runtimeListener(store);
}
