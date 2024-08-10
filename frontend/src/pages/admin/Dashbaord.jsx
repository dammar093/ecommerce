import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import SideBar from '../../components/admin/SideBar'
import TotalCount from '../../components/admin/TotalCount'
import AnalyticalLine from '../../components/admin/AnalyticalLine'

const Dashbaord = () => {
  useEffect(() => {
    document.title = "Dashboard"
  }, [])
  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>

        <div>
          <TotalCount />
        </div>
        <div className='my-3'>
          <AnalyticalLine />
        </div>
      </div>
    </div>
  )
}

export default Dashbaord