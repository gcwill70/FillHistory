import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "./lifecycle_slice";

const lifecycleController = createListenerMiddleware();

// init
lifecycleController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/init"),
  effect: async (action, api) => {
    const state: any = api.getState();
    if (state.lifecycle.init.status !== "done") {
      console.debug(JSON.stringify(state.lifecycle.init.dependencies));
      if (
        state.lifecycle.init.dependencies.length === 0 ||
        state.lifecycle.init.dependencies.every(
          (value: any) => value.status === "done"
        )
      ) {
        api.dispatch(lifecycleSlice.actions.initDone());
      }
    }
  },
});

// deinit
lifecycleController.startListening({
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

export default lifecycleController;
