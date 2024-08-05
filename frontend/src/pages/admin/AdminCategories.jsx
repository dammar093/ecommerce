import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineDelete } from "react-icons/md";
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { addCategoryBypage, removeCategory } from '../../features/categorySlice';
import Loading from '../../components/Loading';
import PopUp from '../../components/PopUp';
import baseUrl from '../../baseUrl';

const AdminCategories = () => {
  const { paginateCategory } = useSelector(state => state.categories)
  const { token } = useSelector(state => state.user)
  const [popup, setPopup] = useState(false)
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const showPopUp = (e, _id) => {
    e.preventDefault()
    setPopup(prev => !prev)
    setId(_id)
  }

  useEffect(() => {
    async function getAllCategories() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/categories/getcategories/${page}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        // console.log(res.data.data.data);

        dispatch(addCategoryBypage(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    getAllCategories()
  }, [dispatch, addCategoryBypage, setPopup])


  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <div className='flex justify-between'>
          <h2 className='text-gray-600 font-semibold text-lg uppercase'>Added Categories</h2>
          <Link to="/add-category" className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-3  py-2 flex rounded  items-center capitalize transition-all hover:bg-[#983cda] "}><div className='flex items-center gap-1 '><IoAddCircleOutline /> <span>Add Category</span></div></Link>
        </div>
        <div className='w-full overflow-x-scroll scroll-smooth mt-3 relative'>
          <table className="table-auto min-w-[80vw] w-full border-spacing-2 px-5 ">
            <thead className='text-[#f3f3f3] bg-[#AE56Ef] font-medium px-5 h-10'>
              <tr>
                <th className='text-left px-2'>Image</th>
                <th className='text-left px-2'>Category</th>
                <th>Total Products</th>
                <th className='px-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='relative'>
              {
                paginateCategory?.data?.map((category) => (
                  <tr className='odd:bg-white even:bg-slate-200' key={category._id}>
                    <td className=''>
                      <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src={category.image} alt={category.title} />
                    </td>
                    <td className='text-gray-600 font-medium text-md capitalize'>{category.title}</td>
                    <td className='text-gray-600 font-medium text-md text-center'>120</td>
                    <td className='px-2'>
                      <div className='flex justify-center'>
                        <Button className={`bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit`}
                          onClick={(e) => showPopUp(e, category._id)}
                        ><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {
            popup && <PopUp setPopup={setPopup} title="category" url={`${baseUrl}/api/v1/categories/delete-category`} handler={removeCategory} id={id} />
          }
        </div>
        <Pagination total={paginateCategory.total} items={paginateCategory.data} url={`${baseUrl}/api/v1/categories/getcategories`} handler={addCategoryBypage} setPage={setPage} />
      </div >
    </div >
  )
}

export default AdminCategories