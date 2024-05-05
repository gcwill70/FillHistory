import React from "react";
import { createRoot } from "react-dom/client";
import PremiumWindow from "../../premium-window/PremiumWindow";
import { createStore } from "../content/store";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import { Provider } from "react-redux";

(async () => {
  const store = createStore();
  store.dispatch(lifecycleSlice.actions.initStart());

  // create UI root
  const root = document.createElement("div");
  createRoot(root).render(
    <Provider store={store}>
      <React.StrictMode>
        <PremiumWindow />
      </React.StrictMode>
    </Provider>
  );

  // inject into page
  document.getElementById("fh-premium")!.appendChild(root);
})();
