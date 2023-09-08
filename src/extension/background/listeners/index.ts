import { createStore } from "../../../core";
import { commandsListener } from "./commands-listener";
import { contextmenuListener } from "./contextmenu-listener";
import { runtimeListener } from "./runtime-listener";
import { setTabListener } from "./set-tab-listener";

export * from "./commands-listener";
export * from "./contextmenu-listener";
export * from "./runtime-listener";
export * from "./set-tab-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  setTabListener(store);
  commandsListener(store);
  runtimeListener(store);
  contextmenuListener(store);
}
