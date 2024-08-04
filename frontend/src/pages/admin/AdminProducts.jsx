import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import Button from '../../components/Button'
import { FiEdit } from 'react-icons/fi'
import { FaRegEye } from 'react-icons/fa'
import Pagination from '../../components/Pagination'

const AdminProducts = () => {
  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <div className='flex justify-between'>
          <h2 className='text-gray-600 font-semibold text-lg uppercase'>Added Products</h2>
          <Link to="/add-product" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-3  py-2 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] "}><div className='flex items-center gap-1 '><IoAddCircleOutline /> <span>Add Product</span></div></Link>
        </div>
        <div className='w-full overflow-x-scroll scroll-smooth mt-3'>
          <table class="table-auto min-w-[80vw] w-full border-spacing-2 px-5 ">
            <thead className='text-[#f3f3f3] bg-[#AE56Ef] font-medium px-5'>
              <tr>
                <th className='px-2'>ID</th>
                <th className='text-left px-2'>Image</th>
                <th className='text-left px-2'>Title</th>
                <th className='col-span-3 px-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='odd:bg-white even:bg-slate-200'>
                <td className='text-gray-600 px-2 text-md'>84723948230482309230</td>
                <td className=''>
                  <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src="https://e7.pngegg.com/pngimages/879/858/png-clipart-smartphone-iphone-mobile-marketing-telecommunication-computer-smartphone-gadget-electronics-thumbnail.png" alt="sjfhsk" />
                </td>
                <td className='text-gray-600 font-medium text-md'>Mobile</td>
                <td className='px-2'>
                  <div className='flex justify-between gap-3'>
                    <Link to="/admin-product/1" className={" bg-[#6c37c9] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#6021b3] w-fit"}><div className='flex items-center gap-1 '><FaRegEye /><span>View</span></div></Link>

                    <Link to="/edit" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2 py-1 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] w-fit"}><div className='flex items-center gap-1 '><FiEdit /><span>Edit</span></div></Link>

                    <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                  </div>
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-200'>
                <td className='text-gray-600 px-2 text-md'>84723948230482309230</td>
                <td className=''>
                  <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src="https://e7.pngegg.com/pngimages/879/858/png-clipart-smartphone-iphone-mobile-marketing-telecommunication-computer-smartphone-gadget-electronics-thumbnail.png" alt="sjfhsk" />
                </td>
                <td className='text-gray-600 font-medium text-md'>Mobile</td>
                <td className='px-2'>
                  <div className='flex justify-between gap-3'>
                    <Link to="/admin-category/1" className={" bg-[#6c37c9] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#6021b3] w-fit"}><div className='flex items-center gap-1 '><FaRegEye /><span>View</span></div></Link>

                    <Link to="/add-category" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2 py-1 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] w-fit"}><div className='flex items-center gap-1 '><FiEdit /><span>Edit</span></div></Link>

                    <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                  </div>
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-200'>
                <td className='text-gray-600 px-2 text-md'>84723948230482309230</td>
                <td className=''>
                  <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src="https://e7.pngegg.com/pngimages/879/858/png-clipart-smartphone-iphone-mobile-marketing-telecommunication-computer-smartphone-gadget-electronics-thumbnail.png" alt="sjfhsk" />
                </td>
                <td className='text-gray-600 font-medium text-md'>Mobile</td>
                <td className='px-2'>
                  <div className='flex justify-between gap-3'>
                    <Link to="/admin-category/1" className={" bg-[#6c37c9] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#6021b3] w-fit"}><div className='flex items-center gap-1 '><FaRegEye /><span>View</span></div></Link>

                    <Link to="/add-category" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2 py-1 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] w-fit"}><div className='flex items-center gap-1 '><FiEdit /><span>Edit</span></div></Link>

                    <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  )
}

export default AdminProducts