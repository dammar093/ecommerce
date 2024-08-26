import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {
    data: [],
    total: null
  }
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.data = [...state.orders.data, action.payload]
    },
    setOrders: (state, action) => {
      state.orders.data = action.payload.data
      state.orders.total = action.payload.total
    },
    removeOrder: (state, action) => {
      state.orders.data = state.orders.data?.filter(order => order._id !== action.payload)
    }
  }
})

export const { addOrder, setOrders, removeOrder } = orderSlice.actions

export default orderSlice.reducer