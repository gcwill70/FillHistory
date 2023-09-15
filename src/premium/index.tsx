import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";

export * from "./App";
export * from "./premium_controller";
export * from "./premium_cta_view";
export * from "./premium_slice";

(async () => {
  // create UI root
  const root = document.createElement("div");
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // inject into page
  document.getElementById("fh-premium")!.appendChild(root);
})();
