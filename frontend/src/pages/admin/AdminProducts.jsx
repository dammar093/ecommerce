import React from 'react'
import SideBar from '../../components/admin/SideBar'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import Button from '../../components/Button'
import { FiEdit } from 'react-icons/fi'
import { FaRegEye } from 'react-icons/fa'
import Pagination from '../../components/Pagination'
import { useSelector } from 'react-redux'
const [page, setPage] = useState(1)
const AdminProducts = () => {
  const { products } = useSelector(state => state.products)
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
                <th className='text-left px-2'>Image</th>
                <th className='text-left px-2'>Title</th>
                <th className='text-left px-2'>Category</th>
                <th className='text-left px-2'>Brand</th>
                <th className='text-left px-2'>Price</th>
                <th className='text-left px-2'>Stock</th>
                <th className='col-span-3 px-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products?.data.map(product => (
                  <tr className='odd:bg-white even:bg-slate-200'>
                    <td className=''>
                      <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src={product.images[0]} alt={product.title} />
                    </td>
                    <td className='text-gray-600 font-medium text-md capitalize'>{product.title}</td>
                    <td className='text-gray-600 font-medium text-md capitalize'>{product.category}</td>
                    <td className='text-gray-600 font-medium text-md'>Rs. {Math.round(product.price - (product.price * product.discountPercentage / 100))}</td>
                    <td className='text-gray-600 font-medium text-md'>{product.Brand}</td>
                    <td className='text-gray-600 font-medium text-md'>{product.stock}</td>
                    <td className='px-2'>
                      <div className='flex justify-between gap-3'>
                        <Link to="/admin-product/1" className={" bg-[#6c37c9] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#6021b3] w-fit"}><div className='flex items-center gap-1 '><FaRegEye /><span>View</span></div></Link>

                        <Link to="/edit" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2 py-1 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] w-fit"}><div className='flex items-center gap-1 '><FiEdit /><span>Edit</span></div></Link>

                        <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination total={products.total} setPage={setPage} />
      </div>
    </div>
  )
}

export default AdminProducts