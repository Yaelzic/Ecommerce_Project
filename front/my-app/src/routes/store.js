import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Products/productSlice';
import cartReducer from './Header/ShoppingCart/cartSlice';
import categoryReducer from './Categories/categorySlice'
import loginReducer from './Login/loginSlice'
import orderReducer from './Products/orderSlice';
import wisheReducer from './Header/WishList/wishSlice'

export const store = configureStore({
  reducer: {
    products : productsReducer,
    cart : cartReducer,
    category : categoryReducer,
    login : loginReducer,
    order:orderReducer,
    wishes:wisheReducer
  },
});
