import { Store } from "webext-redux";
import { subscribeListeners } from "./listeners";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";
import { log } from "../../core/logging";

export * from "./listeners";
export * from "./App";

(async () => {
  log("starting content script");

  const store = new Store();

  await store.ready();

  subscribeListeners(store);

  const root = document.createElement("div");
  document.body.appendChild(root);

  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
})();
