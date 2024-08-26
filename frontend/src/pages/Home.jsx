import React, { useEffect } from 'react'
import Slider from "../components/Slider"
import Categories from '../components/Categories'
import Service from '../components/Service'
import Products from '../components/Products'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addBestDeal, addHighRated, setNewProducts, setProducts } from '../features/productSlice'
import baseUrl from '../baseUrl'

const Home = () => {
  const dispatch = useDispatch();
  const { hightRated, newProducts, bestDeal, products } = useSelector(state => state.products)
  // console.log("high:", hightRated);

  useEffect(() => {
    document.title = "Hamro Mart"
    // funcion for getting high rated products
    async function getHighRatedProducts() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/high-rated`)

        dispatch(addHighRated(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    getHighRatedProducts();
    // function for getting new arrival products 
    async function newArrivalProducts() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/new-arrival`)

        dispatch(setNewProducts(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    newArrivalProducts()
    // function for getting best deal products
    async function bestDealProducts() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/best-deal`)

        dispatch(addBestDeal(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    bestDealProducts()
    // function for getting just for you products
    async function getJustFroYouProducts() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products`)

        dispatch(setProducts(res.data.data))
      } catch (error) {
        console.log(error);
      }
    }
    getJustFroYouProducts()
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
        <Products title={"high rated"} products={hightRated} />
      </div>
      <div className='my-8'>
        <Products title="New Arrival" products={newProducts} />
      </div>
      <div className='my-8'>
        <Products title="Best Deals" products={bestDeal} />
      </div>
      <div className='my-8'>
        <Products title="Just for you" products={products} />
      </div>
    </main>
  )
}

export default Home