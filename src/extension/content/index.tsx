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

  // load tailwind
  const tailwind = document.createElement("link");
  tailwind.rel = "stylesheet";
  tailwind.href = "../../dist/content.css";
  document.head.appendChild(tailwind);

  // load UI root
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
