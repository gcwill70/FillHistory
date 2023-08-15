import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { lifecycleSlice } from "../core/store/slices/lifecycle-slice";

const initReloadController = createListenerMiddleware<RootState>();

initReloadController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    if (api.getState().lifecycle.init.dependencies.reload === "initial") {
      api.dispatch(lifecycleSlice.actions.initReloading());
      chrome.runtime.reload();
      api.dispatch(lifecycleSlice.actions.initReloaded());
    }
  },
});

export default initReloadController;
