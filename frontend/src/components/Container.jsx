import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='px-2 max-w-full md:px-6 min-w-full mx-auto py-1'>
      {children}
    </div>
  )
}

export default Container