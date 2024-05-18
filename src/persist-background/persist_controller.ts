import { createListenerMiddleware } from "@reduxjs/toolkit";
import { favoritesSlice } from "../favorites/favorites_slice";
import { persistSlice } from "../persist/persist_slice";

const persistController = createListenerMiddleware();

// save
persistController.startListening({
  actionCreator: persistSlice.actions.save,
  effect: async (action, api) => {
    const state = api.getState() as any;
    await chrome.storage.local.set({ state: { favorites: state.favorites } });
  },
});
persistController.startListening({
  predicate: (action) => action.type.includes("favorites"),
  effect: async (action, api) => {
    api.dispatch(persistSlice.actions.save());
  },
});

// restore
persistController.startListening({
  actionCreator: persistSlice.actions.restore,
  effect: async (action, api) => {
    const res: Record<string, any> = await chrome.storage.local.get(["state"]);
    // favorites
    if (res.state && res.state.favorites) {
      api.dispatch(favoritesSlice.actions.restore(res.state.favorites.items));
    }
  },
});

export default persistController;
