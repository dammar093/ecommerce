import React, { useEffect, useRef, useState } from 'react';
import Button from "../components/Button";
import { IoCameraSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import Input from '../components/Input';
import Loading from '../components/Loading';
import { MdOutlineModeEditOutline, MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import axios from "axios"
import { addUser } from '../features/userSlice';


const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { user } = useSelector(state => state.user)
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const fileRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(true)
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  // Set initial values
  useEffect(() => {
    if (user) {
      setFullName(user?.fullName || '');
      setUsername(user?.username || '');
      setEmail(user?.email || '');
      setValue('fullName', user?.fullName || '');
      setValue('username', user?.username || '');
      setValue('email', user?.email || '');
    }
  }, [user, setValue]);

  const handelChange = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile)
    setImage(URL.createObjectURL(selectedFile));
  }

  // Handle Input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const updateProfile = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { fullName, email, username, _id: user._id }
      axios.patch("http://localhost:8000/api/v1/users/profile", data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => {
          setLoading(false)
          dispatch(addUser(res.data?.data))
          setEdit(prev => !prev)

        })
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  // update avatar image
  const handleAvatar = () => {
    setLoading(true)
    axios.patch("http://localhost:8000/api/v1/users/update-avatar", { avatar: file }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        dispatch(addUser(res.data?.data))
        setLoading(false)
        setFile(null)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  return (
    <div className='w-full'>
      <div className='w-full md:w-1/2 h-fit bg-white m-auto p-2 rounded '>
        <div className='w-full relative'>
          <div className='w-40 h-40 mx-auto mt-2 rounded-full  relative'>
            <img className='w-full h-full rounded-full' src={file ? image : user?.avatar} alt={user?.fullName} />

            <Button className="absolute bottom-5 right-0 text-2xl w-10 h-10 rounded-full bg-[#af56ef] flex justify-center items-center text-white hover:bg-[#642592] transition-all delay-75"
              onClick={() => fileRef.current.click()}
            >
              <IoCameraSharp />
            </Button>
          </div>
          <div className='flex justify-center mt-1 gap-1'>
            <form onSubmit={handleSubmit((data) => {
              data.avatar = file;
              console.log(data);
            })} method='post'>

              <Input
                type="file"
                hidden
                id="image"
                accept=".jpg,.png,.jpeg"
                {...register('avatar', {
                  required: "Avatar image is required !",

                })}
                onChange={handelChange}
                ref={fileRef}
              />
              {file &&
                <div>
                  <Button className={`px-2 py-1 rounded text-[#f3f3f3] capitalize text-sm ${loading ? "bg-[#d5b4ed] cursor-not-allowed " : " bg-[#AE56EF] hover:bg-[#8d48be]"} transition-all delay-75 flex justify-center items-center gap-1`} type="submit"
                    onClick={handleAvatar}
                  >
                    {loading ? <Loading /> : (<div className='flex gap-1 items-center justify-center'>
                      <span><FaRegSave /></span>
                      <span>save</span>
                    </div>)}

                  </Button>
                </div>
              }
            </form>
            <div>
              {
                (file && !loading) ? <Button className={`px-2 py-1 rounded text-[#f3f3f3] capitalize text-sm bg-[#e04747] hover:bg-[red] transition-all delay-75 flex justify-center items-center gap-1`} type="Button"
                  onClick={() => setFile(null)}
                >
                  <span>< MdOutlineCancel /></span> <span>cancel</span>
                </Button> : ""
              }
            </div>
          </div>
          <div className='w-full md:w-[500px] p-4 mx-auto bg-white rounded'>
            <div className='w-full flex justify-end'>
              {
                edit ? (<Button
                  className="flex items-center gap-1 justify-center px-2 py-1 bg-[#9938de] rounded text-white hover:bg-[#642592] transition-all delay-75"
                  onClick={() => setEdit(prev => !prev)}
                >
                  <span><MdOutlineModeEditOutline /></span>
                  <span>Edit</span>
                </Button>) : (<Button
                  className="flex items-center gap-1 justify-center px-2 py-1 bg-[#e04747] rounded text-white hover:bg-[red] transition-all delay-75"
                  onClick={() => {
                    setEdit(prev => !prev)
                    setFullName(user?.fullName)
                    setUsername(user?.username)
                    setEmail(user?.email)
                  }
                  }
                >
                  <span>< MdOutlineCancel /></span> <span>cancel</span></Button>)
              }
            </div>
            <form className='' onSubmit={updateProfile}>
              <Input type="hidden" value={user?._id}
                {...register('id')}
              />
              <div className='mt-4'>
                <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
                  <Input
                    type="text"
                    className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                    value={fullName}
                    readOnly={edit}
                    {...register('fullName', {
                      required: 'Fullname is required!',
                    })}
                    onChange={handleInputChange(setFullName)}
                  />
                </div>
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className='mt-4'>
                <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
                  <Input
                    type="text"
                    className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                    value={username}
                    readOnly={edit}
                    {...register('username', {
                      required: 'Username is required!',
                    })}
                    onChange={handleInputChange(setUsername)}
                  />
                </div>
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
              </div>
              <div className='mt-4'>
                <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
                  <Input
                    type="email"
                    className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                    value={email}
                    readOnly={edit}
                    {...register('email', {
                      required: 'Email is required!',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'Email not valid',
                      },
                    })}
                    onChange={handleInputChange(setEmail)}
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              {!edit && <div className='mt-4 w-full flex justify-end'>
                <Button
                  className="px-4 py-2 rounded  bg-[#AE56EF] hover:bg-[#8d48be] text-white font-semibold capitalize flex justify-center items-center"
                  type="submit"
                >
                  {loading ? (<Loading />) : <div className='w-full flex justify-center items-center gap-1 text-white'>     <span><FaRegSave /></span>
                    <span>save</span></div>}
                </Button>
              </div>}
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Profile