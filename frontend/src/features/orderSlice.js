import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  orders:{
    data:[],
    total:null
  }
}

const orderSlice = createSlice({
  name:"orders",
  initialState,
  reducers:{
    addOrder:(state,action)=>{
      state.orders.data= [...state.orders.data,action.payload]
    }
  }
})

export const {addOrder} = orderSlice.actions

export default orderSlice.reducer