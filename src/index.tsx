import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Homepage } from "./dashbord/homepage/Homepage";
import Login from "./dashbord/login/Login";
import  { Main } from "./controller/MainNavigator";
import { UserList } from "./dashbord/homepage/UserList";
import Product from "./dashbord/homepage/Product";
import SignUp from "./dashbord/signup/Signup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
