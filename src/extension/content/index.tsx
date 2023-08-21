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
