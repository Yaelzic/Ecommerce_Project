import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrders, fetchOrders, fetchOrderDet } from './orderAPI';

const initialState = {
    myOrders: (JSON.parse(localStorage.getItem("myCart")))
        ? (JSON.parse(localStorage.getItem("myCart"))) : ([]),
    finalOrders : [],
    orderDetails : []
};

export const sendordersAsync = createAsyncThunk(
    'order/sendOrders',
    async (payload) => {
        const response = await sendOrders(payload.myOrders, payload.token);
        return response.data;
    }
);

export const getOrdersAsync = createAsyncThunk(
    'order/fetchOrders',
    async (token) => {
        const response = await fetchOrders(token ? token : token.token);
        return response.data;
    }
);

export const getOrderDetAsync = createAsyncThunk(
    'order/fetchOrderDet',
    async (token) => {
        const response = await fetchOrderDet(token ? token : token.token);
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        sendCart: (state, action) => {
            state.myOrders = action.payload
            localStorage.setItem("myCart", JSON.stringify(state.myOrders));
        },
        clearCart: (state, action) => {
            state.myOrders = []
            localStorage.setItem("myCart", JSON.stringify(state.myOrders));
        },
        removeItem: (state, action) => {
            state.myOrders = state.myOrders.filter((x) => x.id !== action.payload.id);
            localStorage.setItem("myCart", JSON.stringify(state.myOrders));
        },
        addItem: (state, action) => {
            state.myOrders = [...state.myOrders, action.payload];
            localStorage.setItem("myCart", JSON.stringify(state.myOrders));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendordersAsync.fulfilled, (state, action) => {
            })
            .addCase(getOrdersAsync.fulfilled, (state, action) => {
                state.finalOrders = action.payload;
            }).addCase(getOrderDetAsync.fulfilled, (state, action) => {
                state.orderDetails = action.payload;
            });
    },
});


export const { sendCart, clearCart, removeItem, addItem } = orderSlice.actions;
export const selectorders = (state) => state.order.myOrders;
export const selectfinalOrders = (state) => state.order.finalOrders;
export const selectorderDetails = (state) => state.order.orderDetails;
export default orderSlice.reducer;
