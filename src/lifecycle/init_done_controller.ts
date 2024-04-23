import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "./lifecycle_slice";

const initDoneController = createListenerMiddleware();

initDoneController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/init"),
  effect: async (action, api) => {
    const state: any = api.getState();
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
