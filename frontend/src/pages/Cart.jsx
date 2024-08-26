import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import Input from '../components/Input'
import Button from '../components/Button'
import { AiOutlineClose } from "react-icons/ai";
import CheckoutPrice from '../components/CheckoutPrice';
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, decrementQuantity, incrementQuantity, setQuntityByValue } from '../features/cartSlice';
import EmptyCart from '../components/EmptyCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart.cart);
  const { token } = useSelector(state => state.user)
  // console.log(cartProducts.length);
  // console.log(cartProducts);

  useEffect(() => {
    document.title = "Cart"
  }, [])

  // increment quantity 
  async function increaseQuntity(id) {
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/carts/${id}`, { flag: "increment" }, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      // console.log(res.data.data);
      dispatch(incrementQuantity(res.data.data.id))

    } catch (error) {
      console.log(error);

    }
  }
  // decrement quantity
  async function decreaseQuntity(id) {
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/carts/${id}`, { flag: "decrement" }, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      // console.log(res.data.data);
      dispatch(decrementQuantity(res.data.data.id))

    } catch (error) {
      console.log(error);
    }
  }
  // update quantity by value
  async function updateQuanityByValue(e, id) {
    try {
      const res = await axios.patch(`/${baseUrl}api/v1/carts/${id}`, { flag: "value", value: e.target.value }, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      // console.log(res.data.data);
      dispatch(setQuntityByValue(res.data.data))
    } catch (error) {
      console.log(error);

    }
  }

  // delete cart
  const deleteCart = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/carts/${id}`, {
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
  return (
    cartProducts.length > 0 ? (
      <section className='w-full min-h-screen mb-12 md:mb-0'>
        <h1 className='text-xl font-medium text-gray-600 uppercase my-4'>Your Cart</h1>
        <div className='w-full'>
          <div className='w-full  p-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className=' w-full grid grid-cols-1 gap-2 h-fit'>
              {
                cartProducts.map(item => (
                  <div className='w-full p-2 grid grid-cols-1 gap-8 shadow bg-white' key={item._id}>
                    <div className='flex gap-2 w-full relative'>
                      <div className='w-[150px] h-[150px] rounded'>
                        <img className='w-full h-full object-contain rounded' src={item?.product.image} alt={item?.product.title} />
                      </div>
                      <div className='flex items-center'>
                        <div>
                          <h3 className='text-grey capitalize text-md md:text-lg font-semibold text-[#4B5563]'>{String(item?.product.title).substring(0, 30) + "..."}</h3>

                          <div>
                            <div className='text-[#4B5563] capitalize flex gap-1 items-center'>
                              {item?.product.size && <span >Size: <span className='uppercase'>{item?.product.size}</span></span>}
                              {"  "}
                              {item?.product.color && (
                                <div>
                                  Color: <span style={{ backgroundColor: item?.product.color }} className='w-4 h-4 rounded-full inline-block border border-gray-900'></span>
                                </div>
                              )}

                            </div>
                          </div>

                          <div className='text-[#4B5563]'>
                            <span>Rs. {item?.product.price}</span>
                          </div>
                          <div className='flex gap-1 md:gap-2 text-[#4B5563]'>
                            <Button className='w-[40px] py-1 px-2 outline-none border-[#4B5563] border-2 border-solid rounded focus:border-black'
                              onClick={() => decreaseQuntity(item._id)}
                            ><FiMinus
                              /></Button>
                            <Input className="w-[40px] py-1 px-2 outline-none border-[#4B5563] border-2 border-solid rounded text-center focus:border-black" type="text"
                              value={item?.product.quantity}
                              onChange={(e) => updateQuanityByValue(e, item?._id)}
                              min={1} />
                            <Button className="w-[40px] py-1 px-2 outline-none border-[#4B5563] border-2 border-solid rounded focus:border-black"
                              onClick={() => increaseQuntity(item?._id)}
                            ><FiPlus
                              /></Button>
                          </div>
                        </div>
                      </div>
                      <div className='absolute right-0 top-0'>
                        <AiOutlineClose className='text-[#4B5563] text-xl font-semibold cursor-pointer float-right'
                          onClick={() => deleteCart(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='bg-[#F9FAFB] w-full p-4 h-fit'>
              <div>
                <h3 className='text-gray-600 font-semibold uppercase'>order summary</h3>
              </div>
              <CheckoutPrice title="subtotal" price={cartProducts.reduce((acc, item) => item?.product.price * item?.product.quantity + acc, 0)} />
              <div className='w-full'>
                <Button className="bg-[#AE56EF] uppercase w-full py-2 px-4 rounded-full font-semibold text-white hover:bg-[#8042ac]"
                  onClick={() => navigate("/place-order")}
                >Check Out</Button>
              </div>
            </div>
          </div>
        </div>
      </section >
    ) :
      (<EmptyCart />)
  )
}

export default Cart