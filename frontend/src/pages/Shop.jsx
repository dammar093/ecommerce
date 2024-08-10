import React, { useEffect } from 'react'
import Products from "../components/Shop"


const Shop = () => {
  useEffect(() => {
    document.title = "Shop"
  }, [])
  return (
    <div>
      <Products />
    </div>
  )
}

export default Shop