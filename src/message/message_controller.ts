import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";
import { messageSlice } from "./message_slice";

const messageController = createListenerMiddleware();

// init
messageController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: async (action, api) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.debug(
        "message.onMessage: ",
        JSON.stringify(message),
        JSON.stringify(sender)
      );
      api.dispatch(messageSlice.actions.onMessage(message));
    });
  },
});

// sendMessage handler
messageController.startListening({
  actionCreator: messageSlice.actions.sendMessage,
  effect: async (action, api) => {
    console.debug("message.sendMessage: ", JSON.stringify(action));
    try {
      chrome.runtime.sendMessage({ ...action.payload });
    } catch (e) {
      api.dispatch(messageSlice.actions.messageError());
    }
  },
});

// message forwarding
messageController.startListening({
  actionCreator: messageSlice.actions.onMessage,
  effect: async (messageAction, api) => {
    console.debug("message.sendMessage: ", JSON.stringify(messageAction));
    const { type, payload } = messageAction.payload;
    console.debug("message forwarding: ", { type, payload });
    // api.dispatch({ type, payload });
  },
});

export default messageController;
