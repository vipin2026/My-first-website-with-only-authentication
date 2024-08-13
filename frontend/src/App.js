import React from "react";
import "./App.css";
import Routing from "./Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "./components/Topbar/Topbar";
import "./index.css";

export default function App() {
  return (
    <>
      {/* <Topbar/> */}
      <Routing />
      <ToastContainer />
    </>
  );
}
