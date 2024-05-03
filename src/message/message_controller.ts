import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const messageController = createListenerMiddleware();

// receive messages
messageController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      api.dispatch({
        type: message.type,
        payload: message.payload,
      });
    });
  },
});

// send messages
messageController.startListening({
  predicate: (action) => action.type.startsWith("message/"),
  effect: async (action, api) => {
    // send to content scripts
    try {
      const state = api.getState() as any;
      if (state.tabs.current.id >= 0) {
        chrome.tabs
          .sendMessage(state.tabs.current.id, action)
          .then((response) => {})
          .catch((error) => {});
      }
    } catch (e) {
      console.error(e);
    }

    // send to non-content scripts
    chrome.runtime
      .sendMessage(action)
      .then((response) => {})
      .catch((error) => {});
  },
});

export default messageController;
