import React from 'react'

const DashboardCount = ({ data }) => {
  return (
    <div className={`md:w-[20vw] w-[45vw] h-[20vh] rounded overflow-hidden md:min-w-[20vw] min-w-[45vw]  shadow capitalize text-center p-2 text-lg font-medium text-gray-600 ${data.background1}`}>
      <div>
        <h2>{data.title}</h2>
      </div>
      <div className='flex justify-center items-center my-2 gap-2'>
        <div className={`w-10 h-10 text-xl rounded-full p-2 flex justify-center items-center shadow ${data.background2} ${data.text} `}>
          <data.Icon />
        </div>
        <div className={`text-md text-gray-600 font-semibold`}>
          {data.count}
        </div>
      </div>
    </div >
  )
}

export default DashboardCount