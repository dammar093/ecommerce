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
    }
  }
})

export const { addOrder, setOrders } = orderSlice.actions

export default orderSlice.reducer