import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import PopUp from '../../components/PopUp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../features/orderSlice';
import Button from '../../components/Button';
import { MdOutlineDelete } from 'react-icons/md';
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [popup, setPopup] = useState(false)
  const { token } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)
  console.log(orders.data);


  useEffect(() => {
    document.title = "Admin Orders";
    async function getOrders() {
      try {
        const res = await axios.get("/api/v1/orders", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        console.log(res.data);
        dispatch(setOrders(res.data.data))
      } catch (error) {

      }
    }
    getOrders()
  }, [token])
  return (
    orders && <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <div className='w-full overflow-x-scroll scroll-smooth mt-3'>
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
                  <tr className='odd:bg-white even:bg-slate-200' key={order?._id}>
                    <td className='text-slate-600  p-2'>###{order?._id}</td>
                    <td className='text-slate-600  p-2 flex gap-1'>
                      {
                        order?.orders?.map(orderItem => (
                          <img className='md:w-10 md:h-10 h-8 w-8 rounded object-contain'
                            src={orderItem?.product.image} alt={orderItem?.product?.title} />
                        ))
                      }
                    </td>
                    <td className='text-slate-600  p-2 '> Rs.{order?.totalAmount}
                    </td>
                    <td className={`${order?.paymentStatus !== "paid" ? "text-red-500" : "text-green-600"}  p-2 capitalize font-semibold`}>
                      {
                        order?.paymentStatus
                      }
                    </td>
                    <td className='text-slate-600  p-2 '>
                      {
                        order?.paymentMethod
                      }
                    </td>
                    <td className={`${order?.orderStatus !== "delivered" ? "text-red-500" : "text-green-600"}  p-2 capitalize font-semibold`}>
                      {
                        order?.orderStatus
                      }
                    </td>
                    <td className='text-slate-600  p-2 '> {new Date(order?.createdAt).toUTCString()}
                    </td>
                    <td className='flex gap-2'>
                      <Link to={`/admin-orders/${order._id}`}><div className={"bg-[#AE56EF] text-[#f3f3f3] text-[15px] px-2  py-1 flex gap-1 rounded  items-center capitalize transition-all hover:bg-[#830ed6] w-fit"}> <FaRegEye /><span>View</span></div></Link>
                      <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}
                        onClick={() => showPopUp(product._id)}
                      ><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {
            popup && <PopUp setPopup={setPopup} title="product" url={`/api/v1/products`} handler={removeProduct} id={id} />
          }
        </div>
      </div>
    </div>
  )
}

export default AdminOrders