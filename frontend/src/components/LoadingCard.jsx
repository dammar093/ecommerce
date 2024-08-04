import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const LaodingCard = () => {
  return (
    <div className='min-w-[170px] md:min-w-[200px] max-w-[220px] h-[300px] bg-white shadow hover:shadow-2xl rounded flex justify-center p-1 flex-col'>
      <div className='overflow-hidden mx-auto min-w-[170px] md:min-w-[200px] max-w-[220px] h-[300px] bg-slate-400 animate-pulse'>
      </div>
      <div className='w-full p-1 text-[14px] font-medium'>
        <h2 className='whitespace-nowrap text-ellipsis overflow-hidden capitalize text-gray-700 text-[16px] w-30 h-4 bg-slate-400 animate-pulse'></h2>
        <p className='text-sm mt-1 text-gray-600 whitespace-nowrap text-ellipsis overflow-hidden bg-slate-400 w-10 h-2 animate-pulse'></p>
        <div className='flex items-center gap-1 text-[12px] mt-1 w-14 h-2 bg-slate-400 animate-pulse'>
          <div className='w-10 h-2 bg-slate-400 animate-pulse'>
          </div>
          <span className=' text-gray-600 w-5 h-2 bg-slate-400 animate-pulse'></span>
        </div>
        <div className='flex gap-2 items-center mt-1'>
          <span className='text-gray-700 font-medium text-[14px] w-10 h-2 bg-slate-400 animate-pulse'></span>
          <span className='text-gray-600 line-through text-[12px]  w-10 h-2 bg-slate-400 animate-pulse'></span>
        </div>
      </div>
    </div>
  )
}

export default LaodingCard