import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { IoCloudUploadOutline } from "react-icons/io5";
import avatarimg from "../assets/signin.gif"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../components/Loading'
import baseUrl from '../baseUrl'

const Signup = () => {

  const [showEye, setShowEye] = useState(true)
  const [password, setPassword] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handelChange = (e) => {

    let selectedFile = e.target.files[0];
    setFile(selectedFile)
    setImage(URL.createObjectURL(selectedFile));

  }

  const handelPassword = (e) => {
    setPassword(e.target.value)
    console.log(e.target.value);
  }
  useEffect(() => {
    document.title = "Sign Up"
  }, [])

  return (
    <section className='w-full'>
      <div className='w-full md:w-[500px] p-4 mx-auto bg-white rounded'>
        <form method='post'
          encType='multipart/form-data'
          onSubmit={handleSubmit((data) => {
            setLoading(true)
            try {
              data.avatar = file
              // console.log(data);
              axios.post(`${baseUrl}/api/v1/users/signup`, data, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
                .then(res => {
                  setLoading(false)
                  navigate("/login");
                })
                .catch(err => setLoading(false));
            } catch (error) {

            }
          })}

        >
          <div>
            <label htmlFor='image' >
              <div className=' mx-auto mt-4 rounded-full h-[100px] w-[100px] border border-[#AE56EF] overflow-hidden flex items-end cursor-pointer relative'>
                <Input
                  type="file"
                  className="hidden w-full h-full rounded-full z-10"
                  id="image"
                  accept=".jpg,.png,.jpeg"
                  {...register('avatar', {
                    required: "Avatar image is required !",

                  })}
                  onChange={handelChange}
                />
                {
                  image && <img className='absolute top-0 left-0 w-full h-full rounded-full object-cover' src={image} alt={image} /> || <img className='absolute top-0 left-0 w-full h-full rounded-full object-cover' src={avatarimg} alt={"avatar"} />
                }
                <IoCloudUploadOutline className='absolute bottom-2 left-[40%] text-2xl text-gray-600' />
              </div>
            </label>
            {
              errors.avatar && (
                <p className="text-red-500 text-center">{errors.avatar.message}</p>
              )
            }
          </div>
          <div className=' mt-4'>
            <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
              <Input
                type="text"
                className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                placeholder="Enter your fullname"
                {...register('fullName', {
                  required: 'Fullname is required !',
                })}
              />
            </div>
            {
              errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )
            }
          </div>
          <div className=' mt-4'>
            <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
              <Input
                type="text"
                className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                placeholder="Enter username"
                {...register('username', {
                  required: 'Username is required !',
                })}
              />
            </div>
            {
              errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )
            }
          </div>
          <div className=' mt-4'>
            <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
              <Input
                type="email"
                className="w-full h-full bg-transparent text-gray-600 rounded outline-none px-2"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required !',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Email not valid',
                  },
                })}
              />
            </div>
            {
              errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )
            }
          </div>
          <div className='mt-4'>
            <div className='w-full h-10  rounded-md bg-slate-300 text-gray-600 flex justify-between items-center'>
              <Input
                type={showEye ? "password" : "text"}
                className="w-[85%] h-full bg-transparent text-gray-600 rounded outline-none px-2"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required !',

                })}
                onChange={handelPassword}
              />
              {
                password && <div className='h-10 w-[15%] cursor-pointer flex items-center justify-center text-2xl '>
                  {
                    showEye ? <FaRegEyeSlash onClick={() => setShowEye(prev => !prev)} /> : <FaRegEye onClick={() => setShowEye(prev => !prev)} />
                  }
                </div>
              }
            </div>
            {
              errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )
            }
          </div>
          <div className='my-4 w-full'>
            <Button
              className={`w-full h-10 rounded px-2 ${loading ? "vcursor-not-allowed bg-[#bf89e5]" : " bg-[#AE56EF] hover:bg-[#8d48be]"} text-white font-semibold uppercase flex justify-center items-center`}
              type="submit"
              disbaled={loading ? false : true}
            >
              {loading ? (<Loading />) : "Signup"}
            </Button>
          </div>
          <p className='text-md text-gray-600 whitespace-nowrap'>Already have an account? <Link className='text-blue-600 hover:underline' to={"/login"}>Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Signup