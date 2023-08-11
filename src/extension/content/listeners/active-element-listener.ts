import { activeElementSlice, createStore } from "../../../core";

export function activeElementListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("focusin", function(event) {
    const activeElement = event.target as HTMLElement;
    if (activeElement) {
      if (
        activeElement.nodeName === "INPUT" ||
        activeElement.nodeName === "TEXTAREA"
      ) {
        store.dispatch(activeElementSlice.actions.onChange(activeElement.id));
      }
    }
  });
}
