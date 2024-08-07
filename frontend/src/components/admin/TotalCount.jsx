import React from 'react'
import { v4 as uuid } from "uuid"
import DashboardCount from './DashboardCount'
import { useSelector } from 'react-redux'
const TotalCount = () => {
  const { users } = useSelector(state => state.users)
  const { paginateCategory } = useSelector(state => state.categories)
  const { paginateProduct } = useSelector(state => state.products)
  const tolalCount = [
    {
      id: uuid(),
      title: "total income",
      count: 1000,
      background1: "bg-purple-200 ",
      background2: "bg-purple-300",
      background3: "bg-purple-400",
      text: "text-purple-600"
    },
    {
      id: uuid(),
      title: "total user",
      count: users.total,
      background1: "bg-orange-200",
      background2: "bg-orange-300",
      background3: "bg-orange-400",
      text: "text-orange-600"
    },
    {
      id: uuid(),
      title: "total category",
      count: paginateCategory.total,
      background1: "bg-green-200",
      background2: "bg-green-300",
      background3: "bg-green-400",
      text: "text-green-600"
    },
    {
      id: uuid(),
      title: "total products",
      count: paginateProduct.total,
      background1: "bg-sky-200",
      background2: "bg-sky-300",
      background3: "bg-sky-400",
      text: "text-sky-600"
    },
    {
      id: uuid(),
      title: "Placed order",
      count: 100,
      background1: "bg-yellow-200",
      background2: "bg-yellow-300",
      background3: "bg-yellow-400",
      text: "text-yellow-600"
    },
    {
      id: uuid(),
      title: "pending order",
      count: 20,
      background1: "bg-pink-200",
      background2: "bg-pink-300",
      background3: "bg-pink-400",
      text: "text-pink-600"
    },
    {
      id: uuid(),
      title: "cancel order",
      count: "50",
      background1: "bg-red-200",
      background2: "bg-red-300",
      background3: "bg-red-400",
      text: "text-red-600"
    },
    {
      id: uuid(),
      title: "Total review",
      count: "50",
      background1: "bg-teal-200",
      background2: "bg-teal-300",
      background3: "bg-teal-400",
      text: "text-teal-600"
    },
  ]
  return (
    <div className='flex justify-center md:overflow-x-hidden overflow-y-auto md:grid grid-cols-2 md:grid-cols-4 gap-2 w-full place-items-center scrollbar-hide scroll-smooth'>
      {
        tolalCount.map((total) => <DashboardCount data={total} key={total.id} />)
      }
    </div>
  )
}

export default TotalCount