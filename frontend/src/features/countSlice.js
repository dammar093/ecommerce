import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalReview: 0,
  totalSell: 0,
  totalDeliverd: 0,
  pendingOrder: 0,
  cancelledOrder: 0
}

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    addReviewCount: (state, acation) => {
      state.totalReview = acation.payload
    },
    setOrderDetails: (state, action) => {
      state.totalSell = action.payload.totalSell
      state.totalDeliverd = action.payload.deliver
      state.pendingOrder = action.payload.pending
      state.cancelledOrder = action.payload.cancelled
    }

  }
})

export const { addReviewCount, setOrderDetails } = countSlice.actions
export default countSlice.reducer