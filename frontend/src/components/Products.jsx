import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { addBestDeal, addHighRated, setNewProducts, setProducts } from '../features/productSlice';
import baseUrl from '../baseUrl';
import axios from 'axios';

const Products = ({ title, query }) => {

  const { bestDeal, hightRated, newProducts, products } = useSelector(state => state.products)
  console.log("new:: ", newProducts);

  const [laoding, setLoading] = useState(false)
  const scrollRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (query === "best deal") {
      async function fetchProduct() {
        const res = await axios(`${baseUrl}/api/v1/products/best-deal`, {
          withCredentials: true
        });
        dispatch(addBestDeal(res.data.data))
      }
      fetchProduct()
    }
    if (query === "high rated") {
      async function fetchProduct() {
        const res = await axios(`${baseUrl}/api/v1/products/high-rated`, {
          withCredentials: true
        });
        dispatch(addHighRated(res.data.data))
      }
      fetchProduct()
    }
    if (query === "new") {
      async function fetchProduct() {
        const res = await axios(`${baseUrl}/api/v1/products/new-arrival`, {
          withCredentials: true
        });
        dispatch(setNewProducts(res.data.data))
      }
      fetchProduct()
    }
    async function fetchProduct() {
      const res = await axios(`${baseUrl}/api/v1/products`, {
        withCredentials: true
      });
      dispatch(setProducts(res.data.data))
    }
    fetchProduct()
  }, [])

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
    }
  };

  const scrollprev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
    }
  };

  return (
    <section className=' w-full relative flex items-center'>
      <div className='overflow-x-hidden'>
        <h2 className='text-[16px] md:text-xl font-semibold md:font-medium text-gray-600 uppercase my-1'>{title}</h2>
        {
          query === "best deal" && <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
            {
              bestDeal.map(item => (
                <Card item={item} key={item.id} />
              ))
            }
          </div>
        }
        {
          query === "high rated" && <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
            {
              hightRated.map(item => (
                <Card item={item} key={item.id} />
              ))
            }
          </div>
        }
        {
          query === "new" && <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
            {
              newProducts.map(item => (
                <Card item={item} key={item.id} />
              ))
            }
          </div>
        }
        {
          query === "just for you" && <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
            {
              products.data.map(item => (
                <Card item={item} key={item.id} />
              ))
            }
          </div>
        }
      </div>

      <div className='w-fitt w-8 h-8 hidden md:flex items-center justify-center text-gray-600  text-2xl cursor-pointer bg-[#ffffffae] hover:bg-[#808080db] hover:text-white p-2 rounded-full -left-2 absolute transition-all top-1/2'
        onClick={scrollprev}
      >
        <MdOutlineArrowBackIos />
      </div>

      <div className='w-fitt w-8 h-8 hidden md:flex items-center justify-center text-gray-600  text-2xl cursor-pointer bg-[#ffffffae] hover:bg-[#808080db] hover:text-white p-2 rounded-full top-1/2 -right-2 absolute transition-all'
        onClick={scrollNext}
      >
        <MdOutlineArrowForwardIos />
      </div>
    </section>
  )
}


export default Products