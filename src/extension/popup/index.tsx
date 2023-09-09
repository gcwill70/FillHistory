import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import App from "./App";

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
  document.getElementById("fh-popup")!.appendChild(root);
})();
