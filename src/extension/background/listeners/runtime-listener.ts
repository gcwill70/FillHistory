import { commandsSlice, createStore, historySlice } from "../../../core";

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
    details.onDisconnect.addListener((port) => {
      console.debug(`onDisconnect`);
    });
  });
  chrome.runtime.onSuspend.addListener(() => {
    console.debug(`onSuspend`);
  });
}
