import React, { useState } from 'react'
import Button from './Button'
import Loading from './Loading'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PopUp = ({ setPopup, url, id, title, handler }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  // delete category
  const handleDelete = () => {
    setLoading(prev => !prev)
    axios.delete(`${url}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data.data)
        dispatch(handler(res.data.data))
        setLoading(prev => !prev)
        setPopup(false)

      })
      .catch(err => {
        setPopup(false)
        setLoading(prev => !prev)
      })
  }

  return (
    <>
      <div className='w-full h-full bg-[#808080b4] absolute top-0 flex items-center justify-center'>
        <div className=' px-4 py-2 [30vw] h-[20vh] bg-[#f3f3f3]  rounded flex items-center justify-center'>
          <div className='w-full'>
            <div>
              <h2 className='text-gray-600 text-lg '>Are you sure to delete this {title}?</h2>
            </div>
            <div className='flex justify-between mt-3'>
              <Button
                className={`${loading ? "bg-[#c098de]  cursor-not-allowed " : " bg-[#AE56EF] hover:bg-[#8d48be]"} w-[100px] px-4 py-1 rounded text-[#f3f3f3] text-md capitalize   flex justify-center items-center`}
                onClick={handleDelete}
              > {loading ? < Loading /> : "yes"}</Button>
              <Button
                className="w-[100px] px-4 py-1 rounded border  border-[#AE56EF] text-[#AE56EF] text-md capitalize hover:bg-[#AE56EF] hover:text-[#f3f3f3] "
                onClick={() => setPopup(prev => !prev)}
              >cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopUp