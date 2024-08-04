import React from 'react'

const DashboardCount = ({ data }) => {
  return (
    <div className={`md:w-[20vw] w-[45vw] h-[15vh] md:h-[20vh] ${data.background1} rounded overflow-hidden relative flex items-center justify-items-center md:min-w-[20vw] min-w-[45vw]`}>
      <div className={`md:w-[5vw] md:h-[5vw] w-[10vw] h-[10vw] ${data.background2}  rounded-full absolute -left-[1vw] top-[-2vw] flex items-center justify-center`}>
        <div className={`md:w-[4vw] md:h-[4vw] w-[8vw] h-[8vw] ${data.background3}  rounded-full`}>

        </div>
      </div>

      <div className={`md:w-[5vw] md:h-[5vw] w-[10vw] h-[10vw] ${data.background2}  rounded-full absolute -right-[1vw] bottom-[-2vw] flex items-center justify-center`}>
        <div className={`md:w-[4vw] md:h-[4vw] w-[8vw] h-[8vw] ${data.background3}  rounded-full`}>

        </div>
      </div>
      <div className='z-10 w-full p-2'>
        <div className='text-center capitalize md:text-lg tex-md font-[500] text-[#222222]'><h2>{data.title}</h2></div>
        <div className='text-center'>
          <span className={`text-xl font-semibold ${data.text}`}>{data.title.toLowerCase() === 'total income' && "Rs."}{data.count}</span>
        </div>
      </div>
    </div >
  )
}

export default DashboardCount