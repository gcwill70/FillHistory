import { createListenerMiddleware } from "@reduxjs/toolkit";
import { premiumSlice } from "../premium/premium_slice";

const premiumController = createListenerMiddleware();

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
