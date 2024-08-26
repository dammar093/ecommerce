import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <section className='w-full  h-[80vh] flex justify-center items-center'>
      <div className='w-full mt-8'>
        <h2 className=' animate-pulse text-3xl font-semibold text-gray-600 uppercase text-center'>Your cart is empty</h2>
        <div className='w-full mt-4'>
          <div className='w-full flex justify-center'>
            <Link className='text-md uppercase  text-white  bg-[#AE56EF]  rounded-full py-2 px-8 hover:bg-[#682597] transition-all delay-100' to="/products">
              continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section >
  )
}

export default EmptyCart