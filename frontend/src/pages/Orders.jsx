import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '../features/orderSlice'
import Button from '../components/Button'
import { FaStar } from 'react-icons/fa6'

const Orders = () => {
  const { token } = useSelector(state => state.user)
  const { orders } = useSelector(state => state.orders)
  const [errors, setErrors] = useState({})
  // State to track rating and review for each item
  const [reviews, setReviews] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Orders"
    async function getOrders() {
      try {
        const res = await axios.get("/api/v1/orders/user-order", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        })
        dispatch(setOrders(res.data.data))
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      }
    }
    getOrders()
  }, [dispatch, token])

  const handleReview = async (itemId, orderId) => {


    const itemReview = reviews[orderId]?.[itemId]?.review || ""
    const itemRating = reviews[orderId]?.[itemId]?.rating || 0

    if (itemReview.trim().length <= 0) {
      setErrors({ ...errors, review: "Write review first!", itemId: itemId })
    }
    if (itemRating === 0) {
      setErrors({ ...errors, rating: "Give rating first!", itemId: itemId })
    }

    try {
      await axios.post("/api/v1/reviews", {
        product: itemId,
        review: itemReview,
        rating: itemRating,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      // Reset review and rating for the item after successful submission
      setReviews(prev => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          [itemId]: { review: "", rating: 0 }
        }
      }))

    } catch (error) {
      console.error("Failed to submit review:", error)
    }
  }

  const handleRatingChange = (orderId, itemId, rating) => {
    setReviews(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: {
          ...prev[orderId]?.[itemId],
          rating
        }
      }
    }))
    setErrors(prev => ({ ...prev, rating: "", itemId: null }))
  }

  const handleReviewChange = (orderId, itemId, review) => {
    setReviews(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: {
          ...prev[orderId]?.[itemId],
          review
        }
      }
    }))
    setErrors(prev => ({ ...prev, review: "", itemId: null }))
  }

  return (
    orders && <section className='w-full mt-4'>
      <h2 className='text-2xl font-medium text-gray-600'>Your Orders</h2>
      <div className='w-full mt-6'>
        {
          orders?.data.map(order => (
            <div key={order._id} className='bg-[#f3f3f3] p-4 rounded-sm w-[90%] mx-auto shadow-sm mt-1'>
              <div className='text-lg font-medium text-gray-600'>Order Id: ###{order._id}</div>
              <div className='grid grid-cols-1 md:grid-flow-col-2 gap-2 mt-2'>
                {
                  order?.orders.map(item => (
                    <div key={item.product._id}>

                      <div className='flex flex-wrap justify-center md:justify-start'>
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

                          {
                            order.orderStatus === "delivered" && <div className='my-2'>
                              <div>
                                <div className='flex gap-1 my-2'>
                                  {
                                    Array.from({ length: 5 }).map((_, i) => (
                                      <FaStar className={`${i < (reviews[order._id]?.[item?.product._id]?.rating || 0) ? "text-yellow-600" : "text-[#a29e9ed2]"} text-2xl cursor-pointer`} key={i}
                                        onClick={() => handleRatingChange(order._id, item?.product._id, i + 1)}
                                      />
                                    ))
                                  }
                                </div>
                                {(errors?.itemId === item?.product._id) && <p className='text-red-600'>{errors?.rating}</p>}
                              </div>
                              <div>
                                <textarea className='bg-slate-50 p-2 resize-none border shadow rounded w-full' rows={2} placeholder='Write Review...'
                                  value={reviews[order._id]?.[item?.product._id]?.review || ""}
                                  onChange={(e) => handleReviewChange(order._id, item?.product._id, e.target.value)}
                                ></textarea>
                              </div>
                              {(errors?.itemId === item?.product._id) && <p className='text-red-600'>{errors?.review}</p>}
                              <div>

                                <Button className="bg-[#AE56EF] hover:bg-[#7b14c5] px-4 py-1 rounded-sm text-sm text-[#f3f3f3]"
                                  onClick={() => handleReview(item?.product._id, order._id)}
                                >Submit</Button>

                              </div>
                            </div>
                          }

                        </div>

                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='text-gray-600 font-medium'>
                Total Amount : Rs.{order.totalAmount}
              </div>
              <div className='text-gray-600 font-medium'>
                Ordered Date : {new Date(order.createdAt).toUTCString()}
              </div>

              <div className='text-gray-600 font-medium capitalize'>
                Order Status : <span className={`${order.orderStatus !== "delivered" ? "text-red-500" : "text-green-500"} font-semibold`}>{order.orderStatus}</span>
              </div>
              <div className='text-gray-600 font-medium capitalize'>
                Payment Status : <span className={`${order.paymentStatus !== "paid" ? "text-red-500" : "text-green-500"} font-semibold`}>{order.paymentStatus}</span>
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
          ))
        }
      </div >
    </section >
  )
}

export default Orders
