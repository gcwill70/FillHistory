import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core/store/root_reducer";
import { premiumSlice } from "./premium_slice";

const premiumController = createListenerMiddleware<RootState>();

premiumController.startListening({
  actionCreator: premiumSlice.actions.openPage,
  effect: (action, api) => {
    chrome.windows.create({
      url: "premium.html",
      type: "popup",
      width: 780,
      height: 800,
    });
  },
});

export default premiumController;
