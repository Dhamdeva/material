import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  userCart  from './cartSlice';
import  userProduct from './productSlice';



export const store = configureStore({
    reducer:{
        userData:userReducer, 
        cartData:userCart,
        productData:userProduct,
        devTools: process.env.NODE_ENV !== 'production',
    }
})