import { createListenerMiddleware } from "@reduxjs/toolkit";
import HistoryApiChrome from "../../history/api/history_api_chrome";
import { historySlice } from "../store/slices/history-slice";

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

export default historyController;
