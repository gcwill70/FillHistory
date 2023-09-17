import { createStore } from "../../../core";
import { searchSlice } from "../../../search/search_slice";

export function keydownListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const state = store.getState();
    if (state.search.window.show) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        store.dispatch(searchSlice.actions.selectionDecrement());
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        store.dispatch(searchSlice.actions.selectionIncrement());
      } else if (e.key === "Escape") {
        e.preventDefault();
        store.dispatch(searchSlice.actions.window(false));
      }
    }
  });
}
