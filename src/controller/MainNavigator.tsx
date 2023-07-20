import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Homepage } from "../dashbord/homepage/Homepage";
import SignUp from "../dashbord/signup/Signup";
import {Login} from "../dashbord/login/Login";
import { UserList } from "../dashbord/homepage/UserList";
import Product from "../dashbord/homepage/Product";
import { ProductList } from "../dashbord/homepage/ProductList";
import ProductDesign from "../dashbord/homepage/ProductDesign";

function MainNavigator() {
  const navigate=useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const authToken = localStorage.getItem("authtoken"); 
      if (!authToken) {
       navigate('/');
      }
    };

    checkTokenExpiration();
  }, [navigate]);

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login />} />  
        <Route path="/signup"  element={<SignUp  />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productdesign" element={<ProductDesign />} />
      </Routes>
    </div>
  );
}

export default MainNavigator;
