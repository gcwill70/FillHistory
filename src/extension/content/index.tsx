import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { subscribeListeners } from "./listeners";
import { createStore } from "./store/create_store";

(async () => {
  const store = createStore();
  subscribeListeners(store);

  // create UI root
  const root = document.createElement("div");
  root.className = "fh-content";
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
