import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { lifecycleSlice } from "./lifecycle_slice";
import { historySlice } from "../history/history_slice";

const initloadHistoryController = createListenerMiddleware<RootState>();

initloadHistoryController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    const state: RootState = api.getState();
    if (state.lifecycle.init.dependencies.loadHistory === "initial") {
      api.dispatch(lifecycleSlice.actions.initHistoryLoading());
      api.dispatch(historySlice.actions.queryStart({ text: "" }));
      api.dispatch(lifecycleSlice.actions.initHistoryLoaded());
    }
  },
});

export default initloadHistoryController;
