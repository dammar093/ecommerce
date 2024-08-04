import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    data: [],
    total: null
  },
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsers: (state, action) => {
    state.users.data = action.payload.data
    state.users.total=action.payload.total
    console.log("State after update:", state);

    }
  },
});

export const { addUser, setToken, setUsers } = userSlice.actions;
export default userSlice.reducer;