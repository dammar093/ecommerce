import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`} className='min-w-[170px] md:min-w-[200px] max-w-[220px] h-[300px] bg-white shadow hover:shadow-2xl rounded flex justify-center p-1 flex-col'>
      <div className='full h-full overflow-hidden mx-auto'>
        <img className='w-full h-full object-contain rounded-md' src={item.images[0]} alt="" />
      </div>
      <div className='w-full p-1 text-[14px] font-medium'>
        <h2 className='whitespace-nowrap text-ellipsis overflow-hidden capitalize text-gray-700 text-[16px]'>{item.title}</h2>
        <p className='text-sm text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden'>{item.desc}</p>
        <div className='flex items-center gap-1 text-[12px]'>
          {
            item.rating > 0 && <span><Rating rating={item.rating} />
              <span className=' text-gray-600'>(100)</span></span>
          }
        </div>
        <div className='flex gap-2 items-center'>
          <span className='text-gray-700 font-medium text-[14px]'>Rs.{Math.round(item.price - (item.discountPercentage * item.price / 100))}</span>
          <span className='text-gray-600 line-through text-[12px] '>Rs.{item.price}</span>
          {
            item.discountPercentage > 0 && <div className='rounded text-md text-red-500'><span>-{item.discountPercentage}%</span></div>
          }
        </div>
      </div>
    </Link>
  )
}

export default Card