import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import Button from '../components/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { removeFromCart, setCart } from '../features/cartSlice';
import axios from 'axios';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Loading from '../components/Loading';
import Esewa from './Esewa';
import { addOrder } from '../features/orderSlice';


const PlaceOrder = () => {
  const [loading, setLoading] = useState(false)
  const { token, user } = useSelector(state => state.user);
  const [showEsewa, setShowEsewa] = useState(false)
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart)
  const { register, handleSubmit, formState: { errors } } = useForm()
  // console.log(uuid);

  useEffect(() => {
    document.title = "Place Order";
  }, []);

  const deleteCart = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/carts/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      // console.log(res.data.data);
      dispatch(removeFromCart(res.data.data.id))
    } catch (error) {
      console.log(error);
    }
  }
  const handleOrder = async (data) => {
    let totalAmount = cart.reduce((acc, item) => item?.product.price * item?.product.quantity + acc, 0)
    data.products = cart
    data.totalAmount = totalAmount
    console.log(data);

    try {
      const res = await axios.post("/api/v1/orders", data, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      dispatch(addOrder(res.data.data))
      dispatch(setCart([]))
      setShowEsewa(true)
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <section className='w-full  flex justify-between flex-wrap mb-20 md:mt-5 mt-1 relative'>
      <div className='w-full md:w-[49%]'>
        {
          cart.map(cartItem => {
            return (
              <div className='bg-[#f5f5f3] flex gap-2 shadow-sm mt-1 rounded-sm p-2'>
                <div className='md:w-[10vw] md:h-[10vw] w-[150px] h-[150px] overflow-hidden rounded p-1'>
                  <img className='w-full h-full object-contain' src={cartItem?.product.image} alt={cartItem?.product.title} />
                </div>
                <div>
                  <div className='mt-2'>
                    <h1 className='md:text-lg text-sm font-medium text-gray-600' >{String(cartItem?.product.title).substring(0, 60)}... </h1>
                  </div>
                  <div className=' text-gray-600'>
                    Price: <span className='font-medium'>Rs.{cartItem?.product.price}</span>
                  </div>
                  <div className=' text-gray-600'>
                    Quantity: <span className='font-medium'>{cartItem?.product.quantity}</span>
                  </div>
                </div>
                <div className='w-fit'>
                  <button className='text-2xl text-red-600 font-semibold'
                    onClick={() => deleteCart(cartItem._id)}
                  ><AiOutlineClose />
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='w-full md:w-[49%] p-2 py-4 bg-[#f3f3f3] h-fit rounded-sm'>
        <h2 className='text-gray-600 text-lg font-medium'>Shipping Details</h2>
        <form className='mt-5 w-full' method='post' onSubmit={handleSubmit(handleOrder)}>
          <input type="hidden" value={user._id} {...register("id")} />
          <div className='flex gap-1 flex-wrap'>
            <Input
              type="text"
              className="md:w-1/2 w-full  bg-slate-200 py-2 px-1 border text-gray-600 placeholder:text-gray-600 focus:outline-none focus:border-none"
              value={user.fullName}
              readOnly={true}
            />

            <Input
              type="text"
              className="md:w-[49%] w-full  bg-slate-200 py-2 px-1 border text-gray-600 placeholder:text-gray-600 focus:outline-none focus:border-none"
              {...register("username")}
              value={user.username}
              readOnly={true}
            />
          </div>
          <div className='flex flex-wrap gap-2 mt-2 w-full'>
            <div className='md:w-[49%] w-full'>
              <Input
                type="tel"
                className="w-full bg-slate-200 py-2 px-1 border text-gray-600 placeholder:text-gray-600"
                placeholder="Enter your mobile number"
                {...register('contact', {
                  required: 'Contact number is required !',
                  minLength: 10
                })}
              />

              {
                errors.contact && (
                  <p className="text-red-500">{errors.contact.message}</p>
                )
              }
            </div>
            <div className='md:w-[49%] w-full'>
              <Input
                type="tel"
                className="w-full bg-slate-200 py-2 px-1 border text-gray-600 placeholder:text-gray-600 "
                placeholder="Enter your shpping address"
                {...register('address', {
                  required: 'Address number is required !',

                })}
              />

              {
                errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )
              }
            </div>

          </div>
          <div className='mt-2 px-2'>
            <h2 className='text-[#8D48BE] font-medium'>Subtotal</h2>
            <span className='text-gray-600 font-semibold'>Rs.{
              cart.reduce((acc, item) => item?.product.price * item?.product.quantity + acc, 0)
            }</span>
          </div>
          <div className='my-4 w-full'>
            <Button
              className={`w-full h-10 rounded-full px-2 ${loading ? "vcursor-not-allowed bg-[#bf89e5]" : " bg-[#AE56EF] hover:bg-[#8d48be]"} text-white font-semibold  flex justify-center items-center`}
              type="submit"
              disbaled={loading ? false : true}
            >
              {loading ? (<Loading />) : "Proceed to pay"}
            </Button>
          </div>
        </form>
      </div>

      {showEsewa && <Esewa />}

    </section>
  );
}

export default PlaceOrder;
