import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { lifecycleSlice } from "../../lifecycle-content/lifecycle_slice";
import PremiumWindow from "../../premium-window/PremiumWindow";
import { store } from "../content/store";

(async () => {
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
