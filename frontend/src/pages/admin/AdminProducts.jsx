import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import Button from '../../components/Button'
import { FiEdit } from 'react-icons/fi'
import { FaRegEye } from 'react-icons/fa'
import Pagination from '../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import baseUrl from '../../baseUrl'
import { removeProduct, setProductsByPage } from '../../features/productSlice'
import axios from 'axios'
import PopUp from '../../components/PopUp'

const AdminProducts = () => {
  const [page, setPage] = useState(1)
  const [popup, setPopup] = useState(false)
  const [id, setId] = useState(null)
  const { paginateProduct } = useSelector(state => state.products)
  const { token } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const showPopUp = (id) => {
    setPopup(prev => !prev)
    console.log(id);

    setId(id)
  }

  useEffect(() => {

    async function fechProductByPage() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/getproducts/${page}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        console.log(res.data.data);

        dispatch(setProductsByPage(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    fechProductByPage()
  }, [dispatch, setPopup, removeProduct, popup])

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
          <table className="table-auto min-w-[80vw] w-full border-spacing-2 px-5 ">
            <thead className='text-[#f3f3f3] bg-[#AE56Ef] font-medium px-5'>
              <tr>
                <th className='text-left px-2'>Image</th>
                <th className='text-left px-2'>Title</th>
                <th className='text-left px-2'>Category</th>
                <th className='text-left px-2'>Brand</th>
                <th className='text-left px-2'>Price</th>
                <th className='text-left px-2'>Stock</th>
                <th className='col-span-2 px-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                paginateProduct?.data.map(product => (
                  <tr className='odd:bg-white even:bg-slate-200' key={product._id}>
                    <td className=''>
                      <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src={product.images[0]} alt={product.title} />
                    </td>
                    <td className='text-gray-600 font-medium text-md capitalize'>{
                      product.title.substring(0, 20) + "..."
                    }</td>
                    <td className='text-gray-600 font-medium text-md capitalize'>{product.category}</td>
                    <td className='text-gray-600 font-medium text-md'>Rs. {Math.round(product.price - (product.price * product.discountPercentage / 100))}</td>
                    <td className='text-gray-600 font-medium text-md'>{product.Brand}</td>
                    <td className='text-gray-600 font-medium text-md'>{product.stock}</td>
                    <td className='px-2'>
                      <div className='flex justify-between gap-3'>
                        <Link to="/admin-product/1" className={" bg-[#6c37c9] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#6021b3] w-fit"}><div className='flex items-center gap-1 '><FaRegEye /><span>View</span></div></Link>

                        <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}
                          onClick={() => showPopUp(product._id)}
                        ><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {
            popup && <PopUp setPopup={setPopup} title="product" url={`${baseUrl}/api/v1/products`} handler={removeProduct} id={id} />
          }
        </div>
        <Pagination total={paginateProduct.total} setPage={setPage} />
      </div>
    </div>
  )
}

export default AdminProducts