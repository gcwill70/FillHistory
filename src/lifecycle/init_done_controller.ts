import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { lifecycleSlice } from "./lifecycle_slice";

const initDoneController = createListenerMiddleware<RootState>();

initDoneController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/init"),
  effect: async (action, api) => {
    const state: RootState = api.getState();
    if (state.lifecycle.init.status !== "done") {
      if (
        Object.values(state.lifecycle.init.dependencies).every(
          (value) => value === "done"
        )
      ) {
        api.dispatch(lifecycleSlice.actions.initDone());
      }
    }
  },
});

export default initDoneController;
