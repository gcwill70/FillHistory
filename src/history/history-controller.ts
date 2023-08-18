import { createListenerMiddleware } from "@reduxjs/toolkit";
import { historySlice } from "../core/store/slices/history-slice";
import HistoryApiChrome from "./api/history_api_chrome";
import { RootState } from "../core";

const historyController = createListenerMiddleware<RootState>();
const historyApi = new HistoryApiChrome();

historyController.startListening({
  actionCreator: historySlice.actions.queryStart,
  effect: async (action, listenerApi) => {
    try {
      const query = action.payload;
      const results = await historyApi.search({ ...query });
      listenerApi.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      listenerApi.dispatch(historySlice.actions.queryError());
    }
  },
});

historyController.startListening({
  predicate: (action, state) =>
    action.type.startsWith("history/window") && !state.history.window.show,
  effect: async (action, listenerApi) => {
    console.debug("reset results middleware");
    try {
      const results = await historyApi.search({ text: "" });
      listenerApi.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      listenerApi.dispatch(historySlice.actions.queryError());
    }
  },
});

export default historyController;
