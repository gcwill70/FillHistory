import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { Store } from "webext-redux";
import { Provider } from "react-redux";

export * from "./App";
export * from "./premium_controller";
export * from "./premium_cta_view";
export * from "./premium_slice";

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
