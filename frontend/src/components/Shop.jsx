import React, { useEffect, useState } from 'react'
import DropDown from './DropDown';
import Card from './Card';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import baseUrl from '../baseUrl';
import { setProductsByPage } from '../features/productSlice';

const Shop = () => {
  const { paginateProduct } = useSelector(state => state.products);
  const [sort, setSort] = useState(null)
  const [order, setOrder] = useState(null)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${baseUrl}/api/v1/products/${sort}/${order}/${page}`)
      // console.log(res.data.data);
      dispatch(setProductsByPage(res.data.data))
    }
    getProducts()
  }, [dispatch, sort, setOrder, setSort, order])
  return (
    <section className='w-full bg-white p-2 mb-[70px] rounde'>
      <div className='w-full flex justify-between mt-2'>
        <div>
          <h2 className='text-gray-600 font-medium text-2xl '>Products</h2>
        </div>
        <div>
          <DropDown setOrder={setOrder} setSort={setSort} />
        </div>
      </div>
      <div className='grid  grid-cols-2  md:grid-cols-5  xl:grid-cols-6 gap-2'>
        {
          paginateProduct?.data.map(item => (
            <Card item={item} key={item._id} />

          ))
        }
      </div>
      <Pagination total={paginateProduct.total} url={`${baseUrl}/api/v1/products/${sort}/${order}`} handler={setProductsByPage} setPage={setPage} />
    </section>
  )
}

export default Shop