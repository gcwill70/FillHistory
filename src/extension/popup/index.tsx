import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

(async () => {
  // create UI root
  const root = document.createElement("div");
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // inject into page
  document.getElementById("fh-popup")!.appendChild(root);
})();
