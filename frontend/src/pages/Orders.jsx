import React, { useEffect } from 'react'

const Orders = () => {
  useEffect(() => {
    document.title = "Orders"
  }, [])
  return (
    <div>Orders</div>
  )
}

export default Orders