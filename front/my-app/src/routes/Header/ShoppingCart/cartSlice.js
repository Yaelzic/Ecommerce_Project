import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCart, delCart} from './cartAPI'

const initialState = {
  cartlst:[]
};
export function fetchCart(){
  if (localStorage.getItem('cart')){
    initialState.cartlst = localStorage.getItem('cart')
  }
  else {
    initialState.cartlst = []
  }
}


export const getCartsAsync = createAsyncThunk(
    'cart/fetchCart',
    async () => {
      const response = await fetchCart();
      return response.data;
    }
  );

  export const addCartAsync = createAsyncThunk(
    "cart/addCart", 
    async (newProd) => {
    const response = await addCart(newProd);
    console.log(newProd);
    return response;
  });
   
  export const delCartAsync = createAsyncThunk(
    "cart/delCart",
     async (id) => {
    const response = await delCart(id);
    console.log(id);
    return response;
  });
  


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartsAsync.fulfilled, (state, action) => {
      state.cartlst = action.payload;
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.cartlst = [...state.cartlst, action.payload];
      })
      .addCase(delCartAsync.fulfilled, (state, action) => {
        state.cartlst = state.cartlst.filter((x) => x.id !== action.payload);
        console.log("del")
      });
  },
});


export const selectCart = (state) => state.cart.cartlst;
export default cartSlice.reducer;
