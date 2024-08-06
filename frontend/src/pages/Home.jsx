import React, { useEffect } from 'react'
import Slider from "../components/Slider"
import Categories from '../components/Categories'
import Service from '../components/Service'
import Products from '../components/Products'
import axios from 'axios'
import baseUrl from '../baseUrl'
import { useDispatch } from 'react-redux'
import { setProducts } from '../features/productSlice'


const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchProduct() {
      const res = await axios(`${baseUrl}/api/v1/products`, {
        withCredentials: true
      });
      dispatch(setProducts(res.data.data))
    }
    fetchProduct()
  }, [])
  return (
    <main className='mb-[70px]'>
      <section className=''>
        <Slider />
      </section>
      <div className='my-8'>
        <Categories />
      </div>
      <div className='my-8'>
        <Service />
      </div>
      <div className='my-8'>
        <Products title="top rated" />
      </div>
      <div className='my-8'>
        <Products title="New Arrival" />
      </div>
      <div className='my-8'>
        <Products title="Best Deals" />
      </div>
      <div className='my-8'>
        <Products title="Just for you" />
      </div>
    </main>
  )
}

export default Home