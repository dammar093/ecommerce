import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { useSelector } from 'react-redux'
import LaodingCard from './LoadingCard';

const Products = ({ title }) => {
  const products = useSelector(state => state.products.products);
  const [laoding, setLoading] = useState(false)
  const scrollRef = useRef(null);


  useEffect(() => {

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


  if (laoding) {
    return (
      <section className=' w-full relative flex items-center'>
        <div className='overflow-x-hidden'>
          <h2 className='text-[16px] md:text-xl font-semibold md:font-medium text-gray-600 uppercase my-1'>{title}</h2>
          <div className='flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide'>
            {
              products.map(item => (
                <LaodingCard item={item} key={item.id} />
              ))
            }
          </div>
        </div>
      </section>
    )
  }
  else {
    return (
      <section className=' w-full relative flex items-center'>
        <div className='overflow-x-hidden'>
          <h2 className='text-[16px] md:text-xl font-semibold md:font-medium text-gray-600 uppercase my-1'>{title}</h2>
          <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
            {
              products.map(item => (
                <Card item={item} key={item.id} />
              ))
            }
          </div>
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
}

export default Products