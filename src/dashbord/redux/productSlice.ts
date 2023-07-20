import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { constants } from '../../config/constants'

const initialState = {
  useProduct: [],
  selectProduct: {},
  isLoading: false,
  error: '',
}

export const getProductFromServer = createAsyncThunk(
  'product/getProductFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(constants.apiBaseUrl + 'order/product')
      return res.data.data
    } catch (error) {
      return rejectWithValue({ error: 'No Product Data Found' })
    }
  },
) as any

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.useProduct = action.payload
    },
    getProduct: (state, action) => {
      state.selectProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductFromServer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductFromServer.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
        state.useProduct = action.payload
      })
      .addCase(getProductFromServer.rejected, (state, action) => {
        state.error = action.payload.error
        state.isLoading = false
        state.useProduct = []
      })
  },
})

export const { addProduct, getProduct } = productSlice.actions

export default productSlice.reducer
