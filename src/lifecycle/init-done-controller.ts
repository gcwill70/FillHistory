import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState, lifecycleSlice } from "../core";

const initDoneController = createListenerMiddleware<RootState>();

initDoneController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/init"),
  effect: async (action, api) => {
    const state: RootState = api.getState();
    if (
      Object.values(state.lifecycle.init).every((value) => value === "done")
    ) {
      api.dispatch(lifecycleSlice.actions.initDone());
    }
  },
});

export default initDoneController;
