import {createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {fetchWish,addWish,delWish } from './wishAPI'

const initialState = {
  lst:[]
};

export const getWishAsync = createAsyncThunk(
    'wishes/fetchWish',
    async (myToken) => {
      const response = await fetchWish(myToken);
      return response.data;
    }
  );

  
  
export const addWishAsync = createAsyncThunk(
    'wishes/addWish',
    async (obj) => {
        const response = await addWish(obj.prod.id,(obj.token ? obj.token : obj.token.token));
        return response.data;
    }
);

export const delWishAsync = createAsyncThunk(
  'wishes/delWish',
  async (obj) => {
      const response = await delWish(obj.prod.id,obj.myToken);
      return response.data;
  }
);


export const wishSlice = createSlice({
  name: 'wishes',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishAsync.fulfilled, (state, action) => {
        state.lst = action.payload;
      })
      .addCase(addWishAsync.fulfilled, (state, action) => {
        state.lst = [...state.lst, action.payload];
      })
      .addCase(delWishAsync.fulfilled, (state, action) => { 
        state.lst = state.lst.filter((x) => x.id !== parseInt(action.payload));
        console.log(state.lst)
      });
  },
});


export const selectWish = (state) => state.wishes.lst;
export default wishSlice.reducer;
