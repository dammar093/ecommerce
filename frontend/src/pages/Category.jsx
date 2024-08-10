import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
const Card = lazy(() => import('./../components/Card'));
import DropDown from "../components/DropDown"
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import baseUrl from '../baseUrl'
import { setProductsByPage } from '../features/productSlice'
import LoaingCard from '../components/LoaingCard'

const Category = () => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState(null)
  const [sort, setSort] = useState(null)
  const dispatch = useDispatch()
  const { category } = useParams();

  const { paginateProduct } = useSelector(state => state.products);


  useEffect(() => {
    async function getSearchedProducts() {
      const res = await axios.get(`${baseUrl}/api/v1/products/categories/${category}/${sort}/${order}/${page}`)
      console.log(res.data.data);
      dispatch(setProductsByPage(res.data.data))
    }
    getSearchedProducts()
  }, [dispatch, sort, setOrder, setSort, order])

  if (paginateProduct?.data.length == 0) {
    return (
      <section className='w-full mb-20 my-4'>
        <h2 className='text-gray-600 font-semibold uppercase text-center'>Product not avaialbe <span className='text-[#AE56EF]'>{category}</span></h2>
      </section>
    )
  }
  return (
    <section className=' w-full mb-[70px] my-4'>
      <div className='overflow-x-hidden'>
        <div className='flex justify-between my-4'>
          <h2 className='text-[16px]  md:text-xl font-semibold md:font-medium text-gray-600 uppercase my-1'>Category <span className='text-[#AE56EF]'> {category}</span></h2>
          <div>
            <DropDown setOrder={setOrder} setSort={setSort} />
          </div>
        </div>
        <div className='grid  grid-cols-2  md:grid-cols-5  xl:grid-cols-6 gap-2'>
          {
            paginateProduct?.data.map(item => (
              <Suspense key={item._id} fallback={<LoaingCard />}>
                <Card item={item} />
              </Suspense>
            ))
          }
        </div>
        <Pagination url={`${baseUrl}/api/v1/products/categories/${category}/${sort}/${order}`} handler={setProductsByPage} items={paginateProduct?.data} total={paginateProduct.total} page={page} setPage={setPage} />
      </div>
    </section>
  )
}

export default Category