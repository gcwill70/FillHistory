import { createListenerMiddleware } from "@reduxjs/toolkit";
import { messageSlice } from "./message_slice";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const messageController = createListenerMiddleware();

// sendMessage
messageController.startListening({
  actionCreator: messageSlice.actions.sendMessage,
  effect: async (action, api) => {
    try {
      chrome.runtime.sendMessage({ ...action.payload });
    } catch (e) {
      api.dispatch(messageSlice.actions.messageError());
    }
  },
});

// onMessage listener
messageController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("onMessage", request, sender);
      api.dispatch(messageSlice.actions.onMessage({ request, sender }));
    });
  },
});

export default messageController;
