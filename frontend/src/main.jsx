import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { Home, Login, Search, Signup, Cart, Categories, Category, Shop, About, Contact, Product, Profile, PageNotFund, Orders } from "./pages"
import { persistor, store } from "./store/store.js"
import AuthLayout from './components/AuthLayout.jsx'
import Dashbaord from './pages/admin/Dashbaord.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import IsLogedIn from './components/IsLogenIn.jsx'
import AdminAddProduct from './pages/admin/AdminAddProduct.jsx'
import ViewProduct from './pages/admin/ViewProduct.jsx'
import AdminCategories from './pages/admin/AdminCategories.jsx'
import AdminAddCategory from './pages/admin/AdminAddCategory.jsx'
import Users from './pages/admin/Users.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import ViewOrder from "./pages/admin/ViewOrder.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <IsLogedIn><Login /></IsLogedIn>
      },
      {
        path: "signup",
        element: <IsLogedIn><Signup /></IsLogedIn>
      },
      {
        path: "search/:q",
        element: <Search />
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "category/:category",
        element: <Category />
      },
      {
        path: "products",
        element: <Shop />
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "order",
        element: <AuthLayout><Orders /></AuthLayout>
      },
      {
        path: "cart",
        element: <AuthLayout><Cart /></AuthLayout>
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "dashboard",
        element: <AdminLayout><Dashbaord /></AdminLayout>
      },
      {
        path: "admin-products",
        element: <AdminLayout><AdminProducts /></AdminLayout>
      },
      {
        path: "add-product",
        element: <AdminLayout><AdminAddProduct /></AdminLayout>
      },
      {
        path: "admin-product/:id",
        element: <AdminLayout><ViewProduct /></AdminLayout>
      },
      {
        path: "admin-category",
        element: <AdminLayout><AdminCategories /></AdminLayout>
      },
      {
        path: "/add-category",
        element: <AdminLayout><AdminAddCategory /></AdminLayout>
      },
      {
        path: "users",
        element: <AdminLayout><Users /></AdminLayout>
      },
      {
        path: "admin-orders",
        element: <AdminLayout><AdminOrders /></AdminLayout>
      },
      ,
      {
        path: "admin-orders/:id",
        element: <AdminLayout><ViewOrder /></AdminLayout>
      },
      {
        path: "*",
        element: <PageNotFund />
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
