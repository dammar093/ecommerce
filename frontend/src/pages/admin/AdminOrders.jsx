import React, { useEffect } from 'react'
import SideBar from '../../components/admin/SideBar'

const AdminOrders = () => {
  useEffect(() => {
    document.title = "Admin Orders"
  }, [])
  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>

      </div>
    </div>
  )
}

export default AdminOrders