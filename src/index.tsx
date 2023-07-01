import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Homepage } from "./dashbord/homepage/Homepage";
import Login from "./dashbord/login/Login";
import MainNavigator from "./controller/MainNavigator";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainNavigator />
    </BrowserRouter>
  </React.StrictMode>
);
