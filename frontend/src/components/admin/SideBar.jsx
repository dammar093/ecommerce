import React from 'react'
import { MdOutlineProductionQuantityLimits, MdOutlineCategory } from "react-icons/md"
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { BsClipboard2Check } from "react-icons/bs";
import NavBar from './NavBar';
import { useSelector } from 'react-redux';


const SideBar = () => {
  const { user } = useSelector(state => state.user)
  return (
    <aside className='bg-[#f3f3f3] h-[100vh] shadow-md md:w-[14vw] fixed -left-[500px] md:left-0 md:top-17 top-17 z-50' >

      <div className='mt-2 px-2'>
        <div className=''><span className='text-[#AE56EF] text-[14px]'>{(new Date().getHours()) > 17 ? "Good Evening" : (new Date().getHours()) < 12 ? "Good Morning" : "Good Afternoon"}</span> <span className='text-[#3c3a3a] text-md'>{user.fullName?.split(" ")[0]}</span></div>
      </div>
      <div className='px-2 mt-2'>
        <ul>
          <NavBar path="/dashboard" Icon={LuLayoutDashboard} title="Dashboard" />
          <NavBar path="/admin-orders" Icon={BsClipboard2Check} title="Orders" />
          <NavBar path="/admin-products" Icon={MdOutlineProductionQuantityLimits} title="Products" />
          <NavBar path="/admin-category" Icon={MdOutlineCategory} title="Categories" />
          <NavBar path="/users" Icon={TbUsersGroup} title="Users" />

        </ul>
      </div>
    </aside>
  )
}

export default SideBar