import { createStore } from "../store/create_store";
import { commandsListener } from "./commands_listener";
import { contextmenuListener } from "./contextmenu_listener";
import { runtimeListener } from "./runtime_listener";
import { storageListener } from "./storage_listener";
import { setTabListener } from "./tab_listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  storageListener(store);
  setTabListener(store);
  commandsListener(store);
  runtimeListener(store);
  contextmenuListener(store);
}
