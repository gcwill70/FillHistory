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
    if (api.getState().history.items.length > 0) {
      api.dispatch(historySlice.actions.selectionReset());
    }
  },
});

// reset
historyController.startListening({
  actionCreator: historySlice.actions.reset,
  effect: async (action, api) => {
    api.dispatch(historySlice.actions.windowHide());
    api.dispatch(
      historySlice.actions.queryStart({
        text: "",
        maxResults: 250,
        startTime: new Date("2000-01-01T00:00:00Z").getTime(),
      })
    );
  },
});

export default historyController;
