import {createSlice} from "@reduxjs/toolkit";

const initialState ={
  cart:[]
}

const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers:{
    setCart:(state,action)=>{
      state.cart= action.payload
    },
    addToCart:(state,action)=>{
      const itemIndex = state.cart.findIndex((item)=>item?.product._id === action.payload.product._id)
      if(itemIndex >=0){
        state.cart[itemIndex].product.quantity +=1;
      }
      else{
        state.cart = [...state.cart,action.payload]
      }
    },
    removeFromCart:(state,action)=>{
      state.cart = state.cart.filter(item=>item._id !== action.payload);
      // console.log(action.payload);
      
    },
    decrementQuantity:(state,action)=>{
      const itemIndex = state.cart.findIndex((item)=>item?.product._id === action.payload)
    
      if(state.cart[itemIndex].product.quantity >1){
        state.cart[itemIndex].product.quantity -=1;
      }
    },
    incrementQuantity:(state,action)=>{
      const itemIndex = state.cart.findIndex((item)=>item?.product._id === action.payload)
      if(itemIndex >=0){
        state.cart[itemIndex].product.quantity +=1;
      }
    },
    setQuntityByValue:(state,action)=>{
      const itemIndex = state.cart.findIndex((item)=>item?.product._id === action.payload.id)
      state.cart[itemIndex].product.quantity = action.payload.quantity;

    }
  }
})

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,setCart,setQuntityByValue} = cartSlice.actions;
export default cartSlice.reducer;