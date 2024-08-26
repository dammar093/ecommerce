import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import PopUp from '../../components/PopUp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrder, setOrders } from '../../features/orderSlice';
import Button from '../../components/Button';
import { MdOutlineDelete } from 'react-icons/md';
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import baseUrl from '../../baseUrl';

const AdminOrders = () => {
  const [popup, setPopup] = useState(false)
  const [id, setId] = useState(null)
  const [page, setPage] = useState(1)
  const { token } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)

  useEffect(() => {
    document.title = "Admin Orders";
    async function getOrders() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/orders/${page}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        console.log(res.data);
        dispatch(setOrders(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    getOrders()
  }, [token, page, id, popup])

  const showPopUp = (id) => {
    setPopup(prev => !prev)
    // console.log(id);

    setId(id)
  }
  return (
    orders && <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <div className='w-full overflow-x-scroll scroll-smooth mt-3 relative'>
          <table className="table-auto min-w-[80vw] w-full border-spacing-2 px-5">
            <thead className='text-[#f3f3f3] bg-[#AE56Ef] font-medium px-5'>
              <tr>
                <th className=' px-2 '>Order Id</th>
                <th className=' px-2'>Images</th>
                <th className=' px-2 '>Total Price</th>
                <th className=' px-2 '>Payment Status</th>
                <th className=' px-2 '>Payment Method</th>
                <th className=' px-2 ' >Order Status</th>
                <th className=' px-2 ' >Ordered Date</th>
                <th className='px-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                orders?.data.map(order => (
                  <tr className='odd:bg-white even:bg-slate-200 ' key={order?._id}>
                    <td className='text-slate-600  '>###{order?._id}</td>
                    <td className='text-slate-600 flex items-center gap-1 p-2'>
                      {
                        order?.orders?.map(orderItem => (
                          <img className='md:w-10 md:h-10 h-8 w-8 rounded object-contain'
                            src={orderItem?.product.image} alt={orderItem?.product?.title} />
                        ))
                      }
                    </td>
                    <td className='text-slate-600   '> Rs.{order?.totalAmount}
                    </td>
                    <td className={`${order?.paymentStatus !== "paid" ? "text-red-500" : "text-green-600"}   capitalize font-semibold`}>
                      {
                        order?.paymentStatus
                      }
                    </td>
                    <td className='text-slate-600   '>
                      {
                        order?.paymentMethod
                      }
                    </td>
                    <td className={`${order?.orderStatus !== "delivered" ? "text-red-500" : "text-green-600"}   capitalize font-semibold`}>
                      {
                        order?.orderStatus
                      }
                    </td>
                    <td className='text-slate-600   '> {new Date(order?.createdAt).toUTCString()}
                    </td>
                    <td className='flex gap-1 p-2'>
                      <Link to={`/admin-ordersByPage/${order?._id}`}><div className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2  py-1 flex gap-1 rounded  items-center capitalize transition-all hover:bg-[#830ed6] w-fit"}> <FaRegEye /><span>View</span></div></Link>
                      <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}
                        onClick={() => showPopUp(order?._id)}
                      ><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination total={orders?.total} url={`${baseUrl}/api/v1/ordersByPage`} handler={setOrders} setPage={setPage} page={page} items={orders?.data} />
      </div>
      {
        popup && <PopUp setPopup={setPopup} title="order" url={`${baseUrl}/api/v1/orders`} handler={removeOrder} id={id} />
      }
    </div>
  )
}

export default AdminOrders