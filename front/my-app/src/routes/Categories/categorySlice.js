import {createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {fetchCategory, addCategory, delCategory} from './categoryAPI'

const initialState = {
  categories:[]
};

export const getCategoryAsync = createAsyncThunk(
    'category/fetchCategory',
    async () => {
      const response = await fetchCategory();
      return response.data;
    }
  );


  export const addCategoryAsync = createAsyncThunk(
    'category/addCategory',
    async (obj) => {
        const response = await addCategory(obj.CategoryName,obj.myToken);
        return response.data;
    }
);

export const delCategoryAsync = createAsyncThunk(
  'category/delCategory',
  async (obj) => {
      const response = await delCategory(obj.category.id,obj.myToken);
      return response.data;
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
      })
      .addCase(delCategoryAsync.fulfilled, (state, action) => {
      });
  },
});


export const selectCategory = (state) => state.category.categories;
export default categorySlice.reducer;
