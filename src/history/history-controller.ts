import { createListenerMiddleware } from "@reduxjs/toolkit";
import { historySlice } from "../core/store/slices/history-slice";
import HistoryApiChrome from "./api/history_api_chrome";

const historyController = createListenerMiddleware();

historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: async (action, api) => {
    try {
      const query = action.payload;
      const results = await new HistoryApiChrome().search({ ...query });
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

historyController.startListening({
  actionCreator: historySlice.actions.hideWindow,
  effect: async (action, api) => {
    try {
      const results = await new HistoryApiChrome().search({ text: "" });
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

export default historyController;
