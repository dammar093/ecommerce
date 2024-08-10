import React, { useEffect } from 'react'

const Order = () => {
  useEffect(() => {
    document.title = "Orders"
  }, [])
  return (
    <div>Order</div>
  )
}

export default Order