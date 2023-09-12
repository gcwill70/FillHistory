import { commandsSlice } from "../../../commands/commands_slice";
import { createStore } from "../../../core";
import { historySlice } from "../../../history/history-slice";
import { paymentSlice } from "../../../payment/payment_slice";

export function runtimeListener(store: ReturnType<typeof createStore>) {
  chrome.runtime.onInstalled.addListener((details) => {
    console.debug(`onInstalled. reason: ${details.reason}`);
    store.dispatch(historySlice.actions.reset());
    chrome.contextMenus.remove("fh-1");
    chrome.contextMenus.create({
      title: "Search Links",
      contexts: ["all"],
      type: "normal",
      id: "fh-1",
      visible: true,
    });
  });
  chrome.runtime.onStartup.addListener(() => {
    console.debug(`onStartup`);
  });
  chrome.runtime.onConnect.addListener((details) => {
    console.debug(`onConnect: ${details.name}`);
    store.dispatch(commandsSlice.actions.getCommands());
    store.dispatch(paymentSlice.actions.getUser());
    details.onDisconnect.addListener((port) => {
      console.debug(`onDisconnect`);
    });
  });
  chrome.runtime.onSuspend.addListener(() => {
    console.debug(`onSuspend`);
  });
}
