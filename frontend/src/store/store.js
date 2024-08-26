import { combineReducers, configureStore } from "@reduxjs/toolkit";
import poductReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice"
import usersReducer from "../features/usersSlice"
import categoryReducer from "../features/categorySlice"
import orderReducer from "../features/orderSlice"
import countReducer from "../features/countSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage";
import { version } from "react"


// const rootReducer =combineReducers({
//   products:poductReducer,
//   cart:cartReducer,
//   user:userReducer,
//   categories:categoryReducer,
//   users:usersReducer
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   version:1
// }
// const persistedReducer = persistReducer(persistConfig,rootReducer)

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export const persistor = persistStore(store)

const store = configureStore({
  reducer: {
    products: poductReducer,
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,
    users: usersReducer,
    orders: orderReducer,
    count: countReducer
  }
})

export default store