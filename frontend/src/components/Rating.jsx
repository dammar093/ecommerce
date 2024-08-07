import React from 'react'
import { FaStar } from 'react-icons/fa6'

const Rating = ({ rating }) => {


  return (
    <div className='text-[16px] flex '>
      {
        Array.from({ length: 5 }).map((star, index) => <span className={`${index < rating ? "text-yellow-600" : "text-[#a29e9ed2]"}`}><FaStar /></span>)
      }
    </div>
  )
}

export default Rating