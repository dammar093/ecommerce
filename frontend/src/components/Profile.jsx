import React from 'react'

const Profiile = ({ user }) => {

  return (
    <div className='w-10 h-10 rounded-full border-solid border-[2px] overflow-hidden border-[#AE56EF]'>
      <img className='w-full h-full object-cover' src={user?.avatar} alt={user?.loggedInUser?.name} />
    </div>
  )
}

export default Profiile