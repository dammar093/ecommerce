import {createSlice} from "@reduxjs/toolkit";

const initialState={
categories:[],
paginateCategory:{
  data:[],
  total:null
}
}

const categorySlice = createSlice({
  name:'categories',
  initialState,
  reducers:{
    setCategory:(state,action)=>{
      state.categories =action.payload
    },
    addCategory:(state,action)=>{
      state.categories=[...state.categories,action.payload]
    },
    removeCategory:(state,action)=>{
      state.categories = state.categories.filter(item=>item._id !== action.payload._id);
      state.paginateCategory.data = state.paginateCategory.data.filter(item=>item._id !== action.payload._id)
    },
    addCategoryBypage :(state,action)=>{
      state.paginateCategory.data = action.payload.data
      state.paginateCategory.total = action.payload.total
    }
  }
})

export const {setCategory,addCategory,removeCategory,addCategoryBypage} = categorySlice.actions

export default categorySlice.reducer