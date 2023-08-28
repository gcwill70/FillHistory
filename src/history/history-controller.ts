import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { historySlice } from "../core/store/slices/history-slice";
import HistoryApiChrome from "./api/history_api_chrome";
import HistoryRepo from "./repo/history_repo";

const historyController = createListenerMiddleware<RootState>();
const repo = new HistoryRepo(new HistoryApiChrome());

// search start
historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: async (action, api) => {
    try {
      const query = action.payload;
      let results = await repo.search({ ...query });
      results = await repo.filter(results);
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

// search finished
historyController.startListening({
  actionCreator: historySlice.actions.queryDone,
  effect: async (action, api) => {
    console.debug("reset results middleware");
    if (api.getState().history.items.length > 0) {
      api.dispatch(historySlice.actions.selectionReset());
    }
  },
});

export default historyController;
