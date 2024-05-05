import { createListenerMiddleware } from "@reduxjs/toolkit";
import { PayloadMetaAction } from "typesafe-actions";
import { Message, MessageMeta } from "./message";

const messageController = createListenerMiddleware();

// receive messages
messageController.startListening({
  predicate: (action) => action.type.startsWith("lifecycle/initStart"),
  effect: async (action, api) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const action: PayloadMetaAction<string, Message, MessageMeta> = {
        type: message.type,
        payload: message.payload,
        meta: { external: true },
      };
      api.dispatch(action);
    });
  },
});

// send messages
messageController.startListening({
  predicate: (action) => action.type.startsWith("message/"),
  effect: async (action, api) => {
    if (action["meta"]?.external) return;

    const message: Message = {
      type: action.type,
      payload: action.payload,
    };

    // send to active content script
    try {
      const state = api.getState() as any;
      if (chrome.tabs && state.tabs.current.id >= 0) {
        chrome.tabs
          .sendMessage(state.tabs.current.id, message)
          .then((response) => {})
          .catch((error) => {});
      }
    } catch (e) {
      console.error(e);
    }

    // send to other scripts
    try {
      chrome.runtime
        .sendMessage(message)
        .then((response) => {})
        .catch((error) => {});
    } catch (e) {
      console.error(e);
    }
  },
});

export default messageController;
