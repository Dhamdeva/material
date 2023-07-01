import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "../dashbord/homepage/Homepage";
import SignUp from "../dashbord/signup/Signup";
import Login from "../dashbord/login/Login";

function MainNavigator() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default MainNavigator;
