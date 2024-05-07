import { createListenerMiddleware } from "@reduxjs/toolkit";
import { favoritesSlice } from "../favorites/favorites_slice";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { persistSlice } from "./persist_slice";

const persistController = createListenerMiddleware();

// save
persistController.startListening({
  actionCreator: persistSlice.actions.restore,
  effect: async (action, api) => {
    const state = api.getState();
    await chrome.storage.local.set({ state });
  },
});
persistController.startListening({
  actionCreator: lifecycleSlice.actions.deinitStart,
  effect: async (action, api) => {
    api.dispatch(persistSlice.actions.save());
  },
});
persistController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
      port.onDisconnect.addListener(() => {
        api.dispatch(persistSlice.actions.save());
      });
    });
  },
});

// restore
persistController.startListening({
  actionCreator: persistSlice.actions.restore,
  effect: async (action, api) => {
    const res: Record<string, any> = await chrome.storage.local.get(["state"]);
    // favorites
    if (res.state && res.state.favorites) {
      api.dispatch(favoritesSlice.actions.restore(res.state.favorites));
    }
  },
});
persistController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    api.dispatch(persistSlice.actions.restore());
  },
});

export default persistController;
