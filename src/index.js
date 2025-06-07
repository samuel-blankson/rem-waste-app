import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SkipProvider } from "./context/SkipContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkipProvider>
      <App />
    </SkipProvider>
  </React.StrictMode>
);
