import React, { useRef } from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import Card from './Card';

const Products = ({ title, products }) => {

  // console.log(products);

  const scrollRef = useRef(null);
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
        <div className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide`} ref={scrollRef}>
          {
            products.map(product =>
              <Card key={product._id} item={product} />
            )
          }
        </div>
      </div>

      <div className='w-8 h-8 hidden md:flex items-center justify-center text-gray-600  text-2xl cursor-pointer bg-[#ffffffae] hover:bg-[#808080db] hover:text-white p-2 rounded-full -left-2 absolute transition-all top-1/2'
        onClick={scrollprev}
      >
        <MdOutlineArrowBackIos />
      </div>

      <div className='w-8 h-8 hidden md:flex items-center justify-center text-gray-600  text-2xl cursor-pointer bg-[#ffffffae] hover:bg-[#808080db] hover:text-white p-2 rounded-full top-1/2 -right-2 absolute transition-all'
        onClick={scrollNext}
      >
        <MdOutlineArrowForwardIos />
      </div>
    </section>
  )
}


export default Products