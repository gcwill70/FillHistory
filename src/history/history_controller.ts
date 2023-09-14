import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import HistoryApiChrome from "./api/history_api_chrome";
import { historySlice } from "./history_slice";
import HistoryRepo from "./repo/history_repo";

const historyController = createListenerMiddleware<RootState>();
const repo = new HistoryRepo(new HistoryApiChrome());

// search
historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: (action, api) => {
    (async () => {
      try {
        let results = await repo.search({ ...action.payload });
        if (api.getState().payment.user.paid) {
          results = await repo.filter(results);
        }
        api.dispatch(historySlice.actions.queryDone(results));
        api.dispatch(historySlice.actions.selectionReset());
      } catch (e) {
        api.dispatch(historySlice.actions.queryError());
      }
    })();
  },
});

// reset handler
historyController.startListening({
  actionCreator: historySlice.actions.reset,
  effect: (action, api) => {
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
