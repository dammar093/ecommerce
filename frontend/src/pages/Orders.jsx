import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '../features/orderSlice'


const Orders = () => {
  const { token } = useSelector(state => state.user)
  const { orders } = useSelector(state => state.orders)
  console.log(orders);

  const dispatch = useDispatch()
  useEffect(() => {
    document.title = "Orders"
    async function getOrders() {
      const res = await axios.get("/api/v1/orders/user-order", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      // console.log(res.data.data);

      dispatch(setOrders(res.data.data))
    }
    getOrders()
  }, [])
  return (
    orders && <section className='w-full mt-4'>
      <h2 className='text-2xl font-medium text-gray-600'>Your Orders</h2>
      <div className='w-full mt-6'>
        {
          orders?.data.map(order => {
            return (
              <div key={order._id} className='bg-[#f3f3f3] p-4 rounded-sm w-[90%] mx-auto shadow-sm mt-1'>
                <div className='text-lg font-medium text-gray-600'>Order Id: ###{order._id}</div>
                <div className=' grid grid-cols-1 md:grid-flow-col-2 gap-2 mt-2'>

                  {
                    order?.orders.map(item => {
                      return (
                        <div key={item._id} className='flex flex-wrap justify-center md:justify-start' >
                          <div className='md:w-20 md:h-20 w-[100px] h-[100px] p-1'>
                            <img className='w-full h-full object-contain' src={item?.product.image} alt="" />
                          </div>
                          <div>
                            <div>
                              <h1 className='text-gray-600'>{String(item?.product.title)}</h1>
                            </div>
                            <div className='text-gray-600 font-medium'>
                              Quantity: {item?.product.quantity}
                            </div>
                            <div className='text-gray-600 font-medium'>
                              Price: Rs.{item?.product.price}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='text-gray-600 font-medium '>
                  Total Amount : Rs.{order.totalAmount}
                </div>
                <div className='text-gray-600 font-medium '>
                  Ordered Date : {new Date(order.createdAt).toUTCString()}
                </div>

                <div className='text-gray-600 font-medium capitalize'>
                  Order Status : <span className={order.orderStatus !== "delivered" ? "text-red-500" : "text-green-500"}>{order.orderStatus}</span>
                </div>
                <div className='text-gray-600 font-medium capitalize'>
                  Payment Status : <span className={order.paymentStatus !== "paid" ? "text-red-500" : "text-green-500"}>{order.paymentStatus}</span>
                </div>
                <div className='text-gray-600 font-medium capitalize'>
                  Payment Method : {order.paymentMethod}
                </div>
                <div className='text-gray-600 font-medium capitalize'>
                  Ordered By : {order?.user.fullName}
                </div>
                <div className='text-gray-600 font-medium capitalize'>
                  Shipping Address : {order.address}
                </div>
                <div className='text-gray-600 font-medium capitalize'>
                  Contact : {order.contact}
                </div>

              </div>
            )
          })
        }
      </div >
    </section >
  )
}

export default Orders