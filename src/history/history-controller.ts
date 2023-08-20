import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";
import { historySlice } from "../core/store/slices/history-slice";
import HistoryApiChrome from "./api/history_api_chrome";
import HistoryRepo from "./repo/history_repo";

const historyController = createListenerMiddleware<RootState>();
const repo = new HistoryRepo(new HistoryApiChrome());

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

historyController.startListening({
  predicate: (action, state) =>
    action.type.startsWith("history/window") && !state.history.window.show,
  effect: async (action, api) => {
    console.debug("reset results middleware");
    try {
      const results = await repo.search({ text: "" });
      api.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      api.dispatch(historySlice.actions.queryError());
    }
  },
});

export default historyController;
