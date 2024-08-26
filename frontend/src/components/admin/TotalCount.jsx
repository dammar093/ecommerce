import React from 'react'
import { v4 as uuid } from "uuid"
import DashboardCount from './DashboardCount'
import { useSelector } from 'react-redux'
import { FiUsers } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineCategory, MdOutlineProductionQuantityLimits, MdPendingActions, MdOutlineSpeakerNotes } from "react-icons/md";
import { TbBasketCancel } from "react-icons/tb";


const TotalCount = () => {
  const { users } = useSelector(state => state.users)
  const { categories } = useSelector(state => state.categories)
  const { products } = useSelector(state => state.products)
  const { totalReview, totalSell, totalDeliverd, pendingOrder, cancelledOrder, } = useSelector(state => state.count)

  // console.log(totalReview);

  const tolalCount = [
    {
      id: uuid(),
      title: "total sell",
      count: `Rs. ${totalSell}`,
      background1: "bg-gradient-to-r from-purple-200 to-purple-300",
      background2: "bg-purple-300",
      text: "text-purple-600",
      Icon: GiTakeMyMoney
    },
    {
      id: uuid(),
      title: "total user",
      count: users.total,
      background1: "bg-gradient-to-r from-orange-200 to-orange-300",
      background2: "bg-orange-300",
      text: "text-orange-600",
      Icon: FiUsers
    },
    {
      id: uuid(),
      title: "total category",
      count: categories.length,
      background1: "bg-gradient-to-r from-green-200 to-green-300",
      background2: "bg-green-300",
      text: "text-green-600",
      Icon: MdOutlineCategory
    },
    {
      id: uuid(),
      title: "total products",
      count: products.length,
      background1: "bg-gradient-to-r from-sky-200 to-sky-300",
      background2: "bg-sky-300",
      text: "text-sky-600",
      Icon: MdOutlineProductionQuantityLimits
    },
    {
      id: uuid(),
      title: "Placed order",
      count: totalDeliverd,
      background1: "bg-gradient-to-r from-yellow-200 to-yellow-300",
      background2: "bg-yellow-300",
      text: "text-yellow-600",
      Icon: CiDeliveryTruck
    },
    {
      id: uuid(),
      title: "pending order",
      count: pendingOrder,
      background1: "bg-gradient-to-r from-pink-200 to-pink-300",
      background2: "bg-pink-300",
      text: "text-pink-600",
      Icon: MdPendingActions
    },
    {
      id: uuid(),
      title: "cancel order",
      count: cancelledOrder,
      background1: "bg-gradient-to-r from-red-200 to-red-300",
      background2: "bg-red-300",
      text: "text-red-600",
      Icon: TbBasketCancel
    },
    {
      id: uuid(),
      title: "Total review",
      count: totalReview,
      background1: "bg-gradient-to-r from-teal-200 to-teal-300",
      background2: "bg-teal-300",
      text: "text-teal-600",
      Icon: MdOutlineSpeakerNotes
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