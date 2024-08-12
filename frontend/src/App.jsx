import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Header from './components/Header'
import Container from './components/Container'
import BottomNavbar from './components/BottomNavbar'
import ScrollToTop from './components/ScrollToTop'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser, setToken } from './features/userSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("accessToken"))

    dispatch(setToken(token))

    async function getUser() {
      try {
        if (token) {
          const res = axios.get(`/api/v1/users/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          })
          dispatch(addUser((await res).data.data))
        }
      } catch (error) {
        console.log(error);

      }
    }
    getUser()
  }, [])
  return (
    <>
      <div className='top-0 sticky z-20'>
        <Header />
      </div>
      <ScrollToTop />
      <Container>
        <Outlet />
      </Container>
      <div className='bottom-0 fixed z-20 w-full'>
        <BottomNavbar />
      </div>
    </>
  )
}

export default App