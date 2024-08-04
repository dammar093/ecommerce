import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ path, Icon, title }) => {

  return (
    <NavLink to={`${path}`} className={(({ isActive }) => isActive ? "bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-3 mt-1 py-2 flex rounded  items-center capitalize transition-all " : "text-[#3c3a3a] text-[15px] px-3 mt-1 py-2 flex rounded  items-center capitalize hover:bg-[#b576e2dd] hover:text-[#f3f3f3] transition-all ")}><div className='flex items-center gap-1 '><Icon /> <span>{title}</span></div></NavLink>

  )
}
export default NavBar