import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CategoryCard from '../components/CategoryCard'


const Categoreis = () => {
  const { categories } = useSelector(state => state.categories)
  useEffect(() => {
    document.title = "Categories"
  }, [])
  return (
    <div className='mx-auto w-full my-4 mb-20'>
      <h2 className='text-gray-600 tex-lg md:text-xl my-2 font-medium'>All Categories</h2>
      <div className='grid grid-cols-2  lg:grid-cols-6 xl:grid-cols-8 gap-1 place-items-center'>
        {
          categories.map(category => (<div key={category._id}>
            <CategoryCard category={category} />
          </div>))
        }
      </div>
    </div>
  )
}

export default Categoreis