import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { MdOutlineDelete } from 'react-icons/md'
import Button from '../../components/Button'
import Pagination from '../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUsers, removeUser } from '../../features/usersSlice'
import PopUp from '../../components/PopUp'
import baseUrl from '../../baseUrl'
const Users = () => {
  const [popup, setPopup] = useState(false)
  const { token } = useSelector(state => state.user)
  const [page, setPage] = useState(1);
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  const { user } = useSelector(state => state.user)
  const { users, total } = useSelector(state => state.users)
  console.log("data:: ", users.data);
  useEffect(() => {
    document.title = "Users"
    axios.get(`${baseUrl}/api/v1/users/${page}`, {
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
  }, [dispatch, setUsers, setPopup, popup]);


  // show popup
  const showPopUp = (_id) => {
    setPopup(prev => !prev)
    setId(_id)
  }

  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <div className='flex justify-between'>
          <h2 className='text-gray-600 font-semibold text-lg uppercase'>Users</h2>
        </div>
        <div className='w-full overflow-x-scroll scroll-smooth mt-3 relative'>
          <table className="table-auto min-w-[80vw] w-full border-spacing-2 px-5 ">
            <thead className='text-[#f3f3f3] bg-[#AE56Ef] font-medium px-5'>
              <tr>
                <th className='text-left px-2'>Avatar</th>
                <th className='text-left px-2'>FullName</th>
                <th className='text-left px-2'>Role</th>
                <th className='text-left px-2'>Email</th>
                <th className='text-left px-2'>Username</th>
                <th className='px-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users?.data.map(usr => {
                  return <tr className='odd:bg-white even:bg-slate-200' key={usr._id}>
                    <td className=''>
                      <img className='md:w-10 md:h-10 h-8 w-8 rounded-full object-cover' src={usr.avatar} alt={usr.username} />
                    </td>
                    <td className='text-gray-600 font-medium text-md px-2 capitalize'>{usr.fullName}</td>
                    <td className='text-gray-600 font-medium text-md px-2 capitalize'>{usr.role}</td>
                    <td className='text-gray-600 font-medium text-md px-2 lowercase'>{usr.email}</td>
                    <td className='text-gray-600 font-medium text-md  px-2 lowercase'>{usr.username}</td>

                    <td className='px-2'>
                      {
                        user._id === "66aba658f82c2557d15208c0" && <div className='flex justify-between '>
                          {usr._id !== "66aba658f82c2557d15208c0" ? <Button className={"bg-[red] text-[#f3f3f3] text-[15px] px-2  py-1 flex rounded  items-center capitalize transition-all hover:bg-[#932323] w-fit"}
                            onClick={() => showPopUp(usr._id)}
                          ><div className='flex items-center gap-1 '> <MdOutlineDelete /><span>Delete</span></div></Button> : ""}
                        </div>
                      }
                    </td>
                  </tr>
                })
              }



            </tbody>
          </table>
          {
            popup && <PopUp setPopup={setPopup} title="user" url={`${baseUrl}/api/v1/users`} handler={removeUser} id={id} />
          }
        </div>
        <Pagination url={`${baseUrl}/api/v1/users`} items={users.data} handler={setUsers} total={users.total} setPage={setPage} page={page} />
      </div>
    </div>
  )
}

export default Users