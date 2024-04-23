import { commandsSlice } from "../../../commands/commands_slice";
import { paymentSlice } from "../../../payment/payment_slice";
import { searchSlice } from "../../../search/search_slice";
import { createStore } from "../store/create_store";

export function runtimeListener(store: ReturnType<typeof createStore>) {
  chrome.runtime.onInstalled.addListener((details) => {
    console.debug(`onInstalled. reason: ${details.reason}`);
    store.dispatch(searchSlice.actions.reset());
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
  chrome.runtime.onConnect.addListener((port) => {
    console.debug(`onConnect: ${port.name}`);
    store.dispatch(commandsSlice.actions.getCommands());
    store.dispatch(paymentSlice.actions.getUser());
    port.onDisconnect.addListener((port) => {
      console.debug(`onDisconnect`);
    });
  });
  chrome.runtime.onSuspend.addListener(() => {
    console.debug(`onSuspend`);
  });
}
