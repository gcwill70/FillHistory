import { createListenerMiddleware } from "@reduxjs/toolkit";
import { tabsSlice } from "../core/store/slices/tabs-slice";
import { historySlice } from "../core/store/slices/history-slice";

const tabController = createListenerMiddleware();

tabController.startListening({
  actionCreator: tabsSlice.actions.setTab,
  effect: async (action, api) => {
    api.dispatch(historySlice.actions.reset());
  },
});

export default tabController;
