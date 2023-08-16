import { activeElementSlice, createStore } from "../../../core";

export function activeElementListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("focusin", function(event) {
    const activeElement = event.target as HTMLElement;
    if (
      activeElement.nodeName === "INPUT" ||
      activeElement.nodeName === "TEXTAREA"
    ) {
      if (!store.getState().history.window.show) {
        store.dispatch(activeElementSlice.actions.onChange(activeElement.id));
      }
    }
  });
}
