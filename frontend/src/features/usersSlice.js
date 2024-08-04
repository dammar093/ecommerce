import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    data: [],
    total: null
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
    state.users.data = action.payload.data
    state.users.total=action.payload.total
    // console.log("State after update:", state);
    },
    removeUser:(state,action)=>{
      state.users.data = state.users.data.filter(item=>item._id !== action.payload._id)
    }
  },
});

export const {  setUsers,removeUser } = usersSlice.actions;
export default usersSlice.reducer;
