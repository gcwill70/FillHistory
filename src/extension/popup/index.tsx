import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import { createStore } from "../content/store";
import App from "./App";

(async () => {
  const store = createStore();
  store.dispatch(lifecycleSlice.actions.initStart());

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
