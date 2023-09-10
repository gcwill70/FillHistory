import { createStore } from "../../../core";
import { commandsListener } from "./commands-listener";
import { contextmenuListener } from "./contextmenu-listener";
import { runtimeListener } from "./runtime-listener";
import { setTabListener } from "./set-tab-listener";
import { storageListener } from "./storage-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  storageListener(store);
  setTabListener(store);
  commandsListener(store);
  runtimeListener(store);
  contextmenuListener(store);
}
