import { createStore } from "../../../core";
import { activeElementListener } from "./active-element-listener";
import { itemSelectListener } from "./item-select-listener";

export function subscribeListeners(store: ReturnType<typeof createStore>) {
  activeElementListener(store);
  itemSelectListener(store);
}
