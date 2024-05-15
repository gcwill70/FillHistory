import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import App from "./App";
import { store } from "./store";

(async () => {
  store.dispatch(lifecycleSlice.actions.initStart());

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
