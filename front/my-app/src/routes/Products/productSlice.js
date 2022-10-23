import {createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {fetchProduct, delProduct} from './productAPI'

const initialState = {
  lst:[]
};

export const getProductsAsync = createAsyncThunk(
    'products/fetchProduct',
    async () => {
      const response = await fetchProduct();
      return response.data;
    }
  );


export const delProductAsync = createAsyncThunk(
    'products/delProduct',
    async (obj) => {
      console.log(obj.prod.id,obj.myToken)
        const response = await delProduct(obj.prod.id,obj.myToken);
        return response.data;
    }
  );


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) => {
      state.lst = action.payload;
      });
  },
});


export const selectProds = (state) => state.products.lst;
export default productsSlice.reducer;
