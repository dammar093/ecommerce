import React, { useEffect } from 'react'
import CategoryCard from '../components/CategoryCard'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from '../features/categorySlice';


const Categories = () => {
  const { categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getAllCategories() {
      const res = await axios.get(`/api/v1/categories`)
      dispatch(setCategory(res.data.data))
    }
    getAllCategories()
  }, [])
  return (
    <section className=' w-full'>
      <div className='flex items-center gap-2 scrollbar-hide overflow-x-scroll md:overflow-x-hidden md:grid grid-cols-8'>
        {
          categories?.map(category => (
            <div key={category._id}>
              <CategoryCard category={category} />
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default Categories