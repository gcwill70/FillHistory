import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { historySlice } from "../core/store/slices/history-slice";
import HistoryApiChrome from "./api/history_api_chrome";
import HistoryRepo from "./repo/history_repo";

const historyController = createListenerMiddleware<RootState>();
const repo = new HistoryRepo(new HistoryApiChrome());

// search
historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: (action, api) => {
    repo.search({ ...action.payload }).then(
      (results) => {
        repo.filter(results).then(
          (results) => {
            api.dispatch(historySlice.actions.queryDone(results));
            api.dispatch(historySlice.actions.selectionReset());
          },
          (reason) => api.dispatch(historySlice.actions.queryError())
        );
      },
      (reason) => api.dispatch(historySlice.actions.queryError())
    );
  },
});

// reset handler
historyController.startListening({
  actionCreator: historySlice.actions.reset,
  effect: (action, api) => {
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
