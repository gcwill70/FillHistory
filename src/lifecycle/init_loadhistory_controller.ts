import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "./lifecycle_slice";
import { searchSlice } from "../search/search_slice";

const initloadHistoryController = createListenerMiddleware();

initloadHistoryController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    const state: any = api.getState();
    if (state.lifecycle.init.dependencies.loadHistory === "initial") {
      api.dispatch(lifecycleSlice.actions.initHistoryLoading());
      api.dispatch(searchSlice.actions.queryStart({ text: "" }));
      api.dispatch(lifecycleSlice.actions.initHistoryLoaded());
    }
  },
});

export default initloadHistoryController;
