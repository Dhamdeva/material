// redux/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const productDetails = action.payload;
      state.cart.push(productDetails);
    },
    removeToCart: (state, action) => {
      state.cart = state.cart.filter((cart) => cart.id !== action.payload.id)
    },
  },
});

export const { addCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;
