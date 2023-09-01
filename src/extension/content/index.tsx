import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import App from "./App";
import { subscribeListeners } from "./listeners";

export * from "./App";
export * from "./listeners";

(async () => {
  console.debug("content script");

  const store = new Store();
  await store.ready();
  subscribeListeners(store);

  // create UI root
  const root = document.createElement("div");
  root.className = "fh-root";
  root.style.all = "initial";
  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );

  // inject into page
  document.body.appendChild(root);
})();
