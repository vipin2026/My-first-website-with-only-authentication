import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import "./index.css";

export default function Routing() {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route path={path} key={path} element={<Component />} />
      ))}
    </Routes>
  );
}
