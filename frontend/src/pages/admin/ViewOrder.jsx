import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import baseUrl from '../../baseUrl';
const ViewOrder = () => {
  const { id } = useParams()
  const { token } = useSelector(state => state.user)
  const [order, setOrder] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    async function getOrder() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/orders/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        dispatch(setOrder(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    getOrder()
  }, [id, dispatch])

  const handleOrder = async (e) => {
    console.log(e.target.value);
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/orders`, { id: order?._id, status: e.target.value }, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      setOrder(res.data.data)
    } catch (error) {
      console.log(error);

    }
  }
  return (
    order && <div className='w-full relative flex   px-2 '>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full bg-white mb-20 '>
        <div>
          <div className='text-md font-medium text-[#AE56EF]'>Order Id: ###{order?._id}</div>
          <div>
            {
              order?.orders?.map(orderItem => (
                <div key={orderItem?.product?._id}>
                  <h3 className='text-lg text-slate-600 font-medium'>Product Details</h3>
                  <div className='md:w-[10vw] w-[30vw]'>
                    <img src={orderItem?.product?.image} alt={orderItem?.product?.title} />
                  </div>
                  <div>

                    <div>
                      <h2>{orderItem?.product?.title}</h2>
                    </div>
                    <div className='capitalize'>
                      Category: {orderItem?.product?.category}
                    </div>
                    <div className=' capitalize'>
                      Brand: {orderItem?.product?.brand}
                    </div>
                    <div>
                      Rs.{orderItem?.product?.price}
                    </div>
                    <div>
                      Quantity: {orderItem?.product?.quantity}
                    </div>
                    {
                      orderItem?.product?.color &&
                      <div className='flex gap-1 items-center'>
                        Color: <div className={`w-5 h-5 border rounded-full`} style={{ background: orderItem?.product?.color }} >
                        </div >
                      </div>
                    }
                    {
                      orderItem?.product?.size &&
                      <div className='flex gap-1 items-center capitalize'>
                        Size: {orderItem?.product?.size}
                      </div >
                    }
                  </div>
                  <div>
                    <h3 className='text-lg text-slate-600 font-medium'>User Details</h3>
                    <div>
                      User's Name: {order?.user?.fullName}
                    </div>
                    <div>
                      User's Email: {order?.user?.email}
                    </div>
                    <div>
                      User's Conatct: {order?.contact}
                    </div>
                    <div>
                      Shipping Address: {order?.address}
                    </div>
                    <div>
                      <h3 className='text-lg text-slate-600 font-medium'>Order Details</h3>
                      <div>
                        Total Price: Rs.{order?.totalAmount}
                      </div>
                      <div>
                        Payment Status: <span className={`${order?.paymentStatus !== "paid" ? "bg-red-600" : "text-green-600"} capitalize font-semibold`}>{order?.paymentStatus}</span>
                      </div>
                      <div>
                        Payment Method: {order?.paymentMethod}
                      </div>

                      Order Status: {order?.orderStatus !== "delivered" ? <select className='text-red-600 font-semibold'
                        onChange={handleOrder}
                      >
                        <option value="pending" selected>Pending</option>
                        <option className='text-green-600 font-semibold' value="delivered" >Deliver</option>
                      </select>
                        : <span className={`text-green-600 capitalize font-semibold`}>{order?.orderStatus}</span>}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default ViewOrder