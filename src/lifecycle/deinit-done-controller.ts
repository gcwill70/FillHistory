import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState, lifecycleSlice } from "../core";
import { LifecycleStatus } from "../core";

const deinitDoneController = createListenerMiddleware<RootState>();

deinitDoneController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/deinit"),
  effect: async (action, api) => {
    const state: RootState = api.getState();
    if (
      Object.values(state.lifecycle.deinit).every((value) => value === "done")
    ) {
      api.dispatch(lifecycleSlice.actions.deinitDone());
    }
  },
});

export default deinitDoneController;
