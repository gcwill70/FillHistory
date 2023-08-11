import { Middleware } from "@reduxjs/toolkit";
import HistoryApiChrome from "../../history/api/history_api_chrome";
import { historySlice } from "../store/slices/history-slice";

export const historyController: Middleware = (store) => (next) => async (
  action
) => {
  if (historySlice.actions.queryStart.match(action)) {
    try {
      const query = action.payload;
      const results = await new HistoryApiChrome().search({ ...query });
      store.dispatch(historySlice.actions.queryDone(results));
    } catch (e) {
      store.dispatch(historySlice.actions.queryError());
    }
  }
  return next(action);
};
