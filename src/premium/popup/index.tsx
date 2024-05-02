import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { Store } from "webext-redux";
import { Provider } from "react-redux";

(async () => {
  const store = new Store();
  await store.ready();

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
  document.getElementById("fh-premium")!.appendChild(root);
})();
