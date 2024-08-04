import React, { useState } from 'react'
import Container from './Container'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LiaHomeSolid } from "react-icons/lia";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegFileAlt, FaRegUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import Profiile from './Profile';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setToken } from '../features/userSlice';
import axios from 'axios';

const BottomNavbar = () => {
  const [showDropBox, setShowDropBox,] = useState(false);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Container >
      <div className='md:hidden min-w-[300px] rounded-t-xl h-[60px] px-1 bg-white flex items-center justify-between shadow-md '>
        <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-4xl font-medium  transition-all" : "text-gray-600 text-4xl  transition-all font-medium hover:text-[#AE56EF]"} to="/" >
          <span><LiaHomeSolid /> </span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-4xl font-medium  transition-all" : "text-gray-600 text-4xl  transition-all font-medium hover:text-[#AE56EF]"} to="categories" >
          <span><BiCategoryAlt /> </span>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-3xl font-medium  transition-all" : "text-gray-600 text-3xl  transition-all font-medium hover:text-[#AE56EF]"} to="products" >
          <span><BsShop /> </span>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-3xl font-medium  transition-all" : "text-gray-600 text-3xl  transition-all font-medium hover:text-[#AE56EF]"} to="order" >
          <span><FaRegFileAlt /> </span>
        </NavLink>
        <div className='relative'>
          {
            user ? (
              <div onClick={() => setShowDropBox(prev => !prev)} >
                <Profiile user={user} />
              </div>
            ) :
              (
                <div className='text-3xl font-medium text-gray-600' onClick={() => setShowDropBox(prev => !prev)}>
                  <FaRegUser />
                </div>
              )
          }
          {
            showDropBox && (<div className='bg-[#f5f5f5] shadow absolute bottom-14 right-0 w-[150px] h-[100px] '>
              {
                user ?
                  <div className='flex items-center justify-center flex-col rounded-lg py-2 gap-2'>
                    <Link to={"profile"} onClick={() => setShowDropBox(prev => !prev)}>
                      <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                        Profile
                      </span>
                    </Link>
                    <Button className='px-6 py-1 rounded-full bg-[#AE56EF] text-white text-sm font-semibold hover:bg-[#7a40a3] transition-all'
                      onClick={() => {
                        axios.post("http://localhost:8000/api/v1/users/logout")
                          .then(res => {
                            if (res) {
                              dispatch(addUser(null))
                              dispatch(setToken(null))
                              navigate("/")
                            }
                          })
                          .catch(err => console.log(err))
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                  :
                  <div className='flex items-center justify-center flex-col gap-2 py-4'>
                    <Link to={"login"} onClick={() => setShowDropBox(prev => !prev)}>
                      <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                        Sign In
                      </span>
                    </Link>
                    <Link to={"signup"} onClick={() => setShowDropBox(prev => !prev)}>
                      <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                        Sign Up
                      </span>
                    </Link>
                  </div>
              }
            </div>)
          }
        </div>
      </div>
    </Container>
  )
}

export default BottomNavbar