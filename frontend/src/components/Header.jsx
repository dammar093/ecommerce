import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Input from './Input'
import { CiSearch } from "react-icons/ci";
import Container from './Container';
import { FaOpencart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import Profile from './Profile'
import Button from "./Button"
import { useDispatch, useSelector } from 'react-redux';
import { setProductsByPage } from '../features/productSlice';
import axios from 'axios';
import { addUser, setToken } from '../features/userSlice';
import baseUrl from '../baseUrl';



const Header = () => {
  const [search, setSearch] = useState("")
  const [showDropBox, setShowDropBox] = useState(false)
  const searchRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.user.user);
  const { categories } = useSelector(state => state.categories)
  const [categoryIndex, setCategoryIndex] = useState(0)
  const handleSearch = async () => {
    if (search !== '') {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/search/${search}/${null}/${null}/1`)
        dispatch(setProductsByPage(res.data.data))
        setSearch("")
        navigate(`search/${search}`)
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handelEnter = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  const buttonRef = useRef()
  useEffect(() => {
    let interval = setInterval(() => {
      setCategoryIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex > categories.length - 1) {
          return 0;
        }
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [categoryIndex, categories.length, categories]);

  return (
    <header className='w-full h-14 md:h-16 md:py-1 bg-[#f2f2f2] shadow-md  z-10'>
      <Container>
        <nav className='flex justify-between items-center w-full'>
          <div className='flex justify-between items-center  md:w-[32%]'>
            <div>
              <Logo />
            </div>
            <div className='hidden md:flex gap-4'>
              <div>
                <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium  transition-all" : "text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="/" >
                  <span>home</span>
                </NavLink>
              </div>
              <div>
                <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium transition-all" : "text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="products" >
                  <span>shop</span>
                </NavLink>
              </div>
              <div>
                <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium transition-all" : "text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="categories" >
                  <span>Categories</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className='w-[60%] md:w-[32%] md:block'>
            <div className='w-full flex items-center bg-slate-300 rounded-r-full rounded-l-full '>
              <div className='w-full flex items-center justify-between  '>
                <Input

                  className={`w-[80%] md:w-[85%] h-8 bg-transparent rounded-l-full text-[12px] text-gray-700 px-4 outline-none focus:border-[1px] capitalize transition-all ease-in delay-75`}
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  onKeyDown={handelEnter}
                  placeholder={categories[categoryIndex]?.title}
                />
                <div
                  className='bg-[#AE56EF] 
                  h-8 w-[20%] md:-w[m:15%] rounded-r-full flex items-center  justify-center cursor-pointer text-xl font-bold text-gray-300'
                  onClick={handleSearch}

                >
                  <CiSearch />
                </div>
              </div>
            </div>
          </div>
          <div className=' md:w-[32%] '>
            <div className='flex justify-between gap-2 items-center'>
              <div className='hidden md:flex gap-4 items-center'>
                <div>
                  <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium  transition-all" : "text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="about" >
                    <span>about </span>
                  </NavLink>
                </div>
                <div>
                  <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium transition-all" : "text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="contact" >
                    <span>contact </span>
                  </NavLink>
                </div>
                <div>
                  <NavLink className={({ isActive }) => isActive ? "text-[#AE56EF] text-sm uppercase  font-medium transition-all" : " text-[#222222] text-sm uppercase transition-all font-medium hover:text-[#AE56EF]"} to="order" >
                    <span>Orders </span>
                  </NavLink>
                </div>

              </div>
              <div className='flex items-center gap-4 relative'>
                <div>
                  <NavLink to={"cart"}>
                    <div className='text-4xl md:text-3xl  text-gray-700 font-medium relative'>
                      <FaOpencart />
                      {
                        user && cart.length > 0 && <div className='w-4 h-4 rounded-full bg-[#AE56EF] absolute flex items-center justify-center -top-2 left-2 p-2 '>
                          <span className='text-[9px] text-white'>{cart.reduce((acc, item) => item?.product.quantity + acc, 0)}</span>
                        </div>
                      }
                    </div>
                  </NavLink>
                </div>
                {
                  !user ? (
                    <div className='text-3xl text-gray-700 cursor-pointer hidden md:block' onClick={() => setShowDropBox(prev => !prev)}><FaRegUser /></div>
                  )
                    :
                    (
                      <div className='cursor-pointer hidden md:block' onClick={() => setShowDropBox(prev => !prev)}><Profile user={user} /></div>
                    )
                }
                {
                  showDropBox && (<div className='bg-[#f5f5f5] shadow absolute top-14 right-0 w-[150px] h-fit hidden md:block '>
                    {
                      user ?
                        <div className='flex items-center justify-center flex-col rounded-lg py-2 gap-2'>
                          {
                            user?.role === "admin" && (<Link to={"dashboard"} onClick={() => setShowDropBox(prev => !prev)}>
                              <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                                Dashboard
                              </span>
                            </Link>)
                          }
                          <Link to={"profile"} onClick={() => setShowDropBox(prev => !prev)}>
                            <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                              Profile
                            </span>
                          </Link>
                          <Button className='px-6 py-1 rounded-full bg-[#AE56EF] text-white text-sm font-semibold hover:bg-[#7a40a3] transition-all '
                            onClick={() => {
                              axios.post(`${baseUrl}/api/v1/users/logout`)
                                .then(res => {
                                  if (res) {
                                    dispatch(addUser(null))
                                    dispatch(setToken(null))
                                  }
                                })
                                .catch(err => console.log(err))
                              localStorage.removeItem("accessToken")
                              navigate("/")
                            }
                            }
                          >
                            Logout
                          </Button>
                        </div>
                        :
                        <div className='flex items-center justify-center flex-col gap-2 py-4'>
                          <Link to={"login"} onClick={() => setShowLogout(prev => !prev)}>
                            <span className='text-md font-medium text-gray-700 hover:text-[#AE56EF]'>
                              Sign In
                            </span>
                          </Link>
                          <Link to={"signup"} onClick={() => setShowLogout(prev => !prev)}>
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
          </div>
        </nav>
      </Container>
    </header >
  )
}

export default Header