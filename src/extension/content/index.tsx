import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import App from "./App";
import { subscribeListeners } from "./listeners";

import "../../assets/tailwind.css";

export * from "./App";
export * from "./listeners";

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
  if (sRoot?.shadowRoot) {
    sRoot.shadowRoot.innerHTML = `<style>:host {all: initial;}</style>`;
  }
  sRoot.shadowRoot!.appendChild(root);
})();
