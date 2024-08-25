import React from 'react'

import Rating from './Rating';

const Review = ({ review, rating }) => {

  return (
    <section className='bg-white w-full shadow-sm p-2 my-2'>
      <div className='w-full flex justify-between items-center'>
        <div>
          <div>
            <div>
              <div className='flex gap-2 items-center'>
                <div className='w-10 rounded overflow-hidden'>
                  <img className='h-full w-full object-cover' src={review?.user?.avatar} alt="" />
                </div>
                <div>
                  <h2 className='text-gray text-md font-medium capitalize'>{review.user.fullName}</h2>
                </div>
                <span className='text-sm text-gray-600'>{new Date(review?.createdAt).toUTCString()}</span>
              </div>
              <div className='my-1'>
                <Rating rating={rating} />
                <p className='text-md text-gray-500'>{review?.review}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Review