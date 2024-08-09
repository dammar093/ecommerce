import React from 'react'

const LoaingCard = () => {
  return (
    <div className='min-w-[170px] md:min-w-[20vw] max-w-[22vw] h-[300px] bg-white shadow rounded flex justify-center p-1 flex-col'>
      <div className=' h-full w-full overflow-hidden mx-auto bg-slate-300 animate-pulse'>

      </div>
      <div className='w-full mt-1 '>
        <h2 className='w-full py-2 bg-slate-300 animate-pulse'></h2>
        <p className='w-full h-3 mt-1 bg-slate-300 animate-pulse'></p>
        <p className='w-full h-3 mt-1 bg-slate-300 animate-pulse'></p>
        <div className='flex gap-2 mt-1'>
          <span className=' w-[40%] h-4 bg-slate-300 animate-pulse'></span>
          <span className=' w-[40%] h-4 bg-slate-300 animate-pulse'></span>

        </div>
      </div>
    </div>
  )
}

export default LoaingCard