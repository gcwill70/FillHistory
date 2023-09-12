import { createStore } from "../../../core";
import { commandsListener } from "./commands_listener";
import { contextmenuListener } from "./contextmenu-listener";
import { runtimeListener } from "./runtime_listener";
import { setTabListener } from "./tab_listener";
import { storageListener } from "./storage_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  storageListener(store);
  setTabListener(store);
  commandsListener(store);
  runtimeListener(store);
  contextmenuListener(store);
}
