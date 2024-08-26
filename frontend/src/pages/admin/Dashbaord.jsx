import React, { useEffect } from 'react'
import SideBar from '../../components/admin/SideBar'
import TotalCount from '../../components/admin/TotalCount'
import AnalyticalLine from '../../components/admin/AnalyticalLine'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../features/usersSlice'
import axios from 'axios'
import baseUrl from '../../baseUrl'
import { addReviewCount, setOrderDetails } from '../../features/countSlice'

const Dashbaord = () => {
  const { token } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = "Dashboard"
    axios.get(`${baseUrl}/api/v1/users/${1}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true
    })
      .then(res => {
        // console.log(res.data.data)
        dispatch(setUsers(res.data.data))
      })
      .catch(err => {
        console.log(err);
      })

  }, [])

  useEffect(() => {
    async function countReview() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/reviews/count`)
        // console.log(res.data.data);
        dispatch(addReviewCount(res.data.data.total))
      } catch (error) {
        console.log(error);

      }
    }
    countReview()
  }, [])
  useEffect(() => {
    async function getOrderDetails() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/orders/sell`)
        console.log(res.data);
        dispatch(setOrderDetails(res.data.data))
      } catch (error) {
        console.log(error);
      }
    }
    getOrderDetails()
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