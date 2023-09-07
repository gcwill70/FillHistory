import { createStore } from "../../../core";

export function runtimeListener(store: ReturnType<typeof createStore>) {
  chrome.runtime.onInstalled.addListener((details) => {
    console.debug(`onInstalled. reason: ${details.reason}`);
  });
  chrome.runtime.onStartup.addListener(() => {
    console.debug(`onStartup`);
  });
  chrome.runtime.onConnect.addListener((details) => {
    console.debug(`onConnect: ${details.name}`);
    details.onDisconnect.addListener((port) => {
      console.debug(`onDisconnect`);
    });
  });
  chrome.runtime.onSuspend.addListener(() => {
    console.debug(`onSuspend`);
  });
}
