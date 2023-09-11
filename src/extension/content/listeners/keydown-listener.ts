import { createStore } from "../../../core";
import { historySlice } from "../../../history/history-slice";

export function keydownListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const state = store.getState();
    if (state.history.window.show) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        store.dispatch(historySlice.actions.selectionDecrement());
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        store.dispatch(historySlice.actions.selectionIncrement());
      } else if (e.key === "Escape") {
        e.preventDefault();
        store.dispatch(historySlice.actions.window(false));
      }
    }
  });
}
