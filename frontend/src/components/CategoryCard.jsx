import React from 'react'
import { Link } from 'react-router-dom'
const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/category=${category.title}`} className='w-[45vw] h-[170px] md:w-[150px] md:h-[150px] bg-white shadow py-2 flex items-center justify-center flex-col rounded overflow-hidden hover:shadow-xl'>
      <img className='w-[140px] h-[120px] md:w-[100px] md:h-[100px] object-contain hover:scale-110 transition-all' src={category.image} alt="" />
      <h2 className='text-md text-gray-700 font-medium uppercase'>{category.title}</h2>
    </Link>
  )
}

export default CategoryCard