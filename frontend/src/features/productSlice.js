import {createSlice} from "@reduxjs/toolkit";

const initialState ={
  products:[],
  search:[],
  searchCategory:[]
};

const productSlice = createSlice({
  name:"products",
  initialState,
  reducers:{
    setProducts:(state,action)=>{
      state.products = action.payload;
    },
    getAllProducts : (state,_)=>{
    return state.products;
    },
    searchedProducts :(state,action)=>{
      state.search = state.products.filter(item => (item.title.toLowerCase().trim().includes(action.payload) || item.category.toLowerCase().trim().includes(action.payload)))
    },
    searchByCategory:(state,action)=>{
      state.searchCategory = state.products.filter(item=>item.category.toLowerCase().trim() === action.payload)
    },
    addProductToState:(state,action)=>{
      state.products= [...state.products,action.payload]
    }
  }
});

export const {setProducts,getAllProducts,searchedProducts,searchByCategory,addProductToState} = productSlice.actions;

export default productSlice.reducer