import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <div className="overflow-x-hidden">
    <Router>
      <App />
    </Router>
  </div>
);
