import { Store } from "webext-redux";
import { subscribeListeners } from "./listeners";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";

export * from "./listeners";
export * from "./App";

(async () => {
  console.log("content script");

  const store = new Store();
  await store.ready();
  subscribeListeners(store);

  // create UI root
  const root = document.createElement("div");
  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );

  // inject into page
  const sRoot = document.createElement("div");
  document.body.appendChild(sRoot);
  sRoot.attachShadow({ mode: "open" });
  sRoot.shadowRoot!.innerHTML = `<style>:host {all: initial;}</style>`;
  sRoot.shadowRoot!.appendChild(root);
})();
