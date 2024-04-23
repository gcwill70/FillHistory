import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "./lifecycle_slice";

const deinitDoneController = createListenerMiddleware();

deinitDoneController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/deinit"),
  effect: async (action, api) => {
    const state: any = api.getState();
    if (
      Object.values(state.lifecycle.deinit).every((value) => value === "done")
    ) {
      api.dispatch(lifecycleSlice.actions.deinitDone());
    }
  },
});

export default deinitDoneController;
