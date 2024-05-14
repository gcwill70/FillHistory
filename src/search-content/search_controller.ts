import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { searchSlice } from "../search/search_slice";

const searchController = createListenerMiddleware();

// key events
searchController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const state = api.getState() as any;
      if (state.search.window.show) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          api.dispatch(searchSlice.actions.selectionDecrement());
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          api.dispatch(searchSlice.actions.selectionIncrement());
        } else if (e.key === "Escape") {
          e.preventDefault();
          api.dispatch(searchSlice.actions.window(false));
        }
      }
    });
    api.dispatch(searchSlice.actions.reset());
  },
});

export default searchController;
