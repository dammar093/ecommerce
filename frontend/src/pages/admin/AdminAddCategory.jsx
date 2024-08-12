import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../../components/admin/SideBar';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { VscCloudUpload } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import Button from "../../components/Button";
import { MdOutlineUpload } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from '../../features/categorySlice';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';



const AdminAddCategory = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [url, setUrl] = useState(null);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { token } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setUrl(url);
    }
    setValue('image', selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setValue('image', selectedFile);
      setUrl(url);
    }
  };

  const handleCategory = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(`/api/v1/categories/add-category`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      dispatch(addCategory(response.data.data));
      setLoading(false)
      navigate("/admin-category")

    } catch (err) {
      setLoading(false)
      console.error(err);
      setError(err.message);
    }

  };
  useEffect(() => {
    document.title = "Admin Add Category"
  }, [])

  return (
    <div className='w-full relative flex'>
      <div>
        <SideBar />
      </div>
      <div className='m-0 mt-2 md:ml-[13vw] w-full '>
        <h2 className='text-2xl font-semibold text-gray-600 uppercase text-center'>Add Category</h2>
        <div className='w-full bg-[#f3f3f3] mt-3'>
          <form className='w-full' method='post' encType='multipart/form-data' onSubmit={handleSubmit(handleCategory)}>
            <div className='w-full md:w-1/2 mx-auto'>
              <div className='w-full mx-auto'>
                <div className='w-full h-10 rounded-md bg-slate-300 text-gray-600'>
                  <Input
                    type="text"
                    className="w-full h-full bg-gray-300 text-gray-600 rounded outline-none px-2"
                    placeholder="Enter title of category"
                    {...register('title', { required: 'Title is required!' })}
                  />
                </div>
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>
              <div className='w-full mt-2'>
                <div className='w-full h-[200px] border-2 border-dashed border-gray-300 cursor-pointer p-2'
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {url ? (
                    <div className='w-full'>
                      <RxCross2 className='float-right text-xl text-gray-600 cursor-pointer' onClick={() => setUrl(null)} />
                      <div className='w-full flex justify-center'>
                        <img className='w-full h-[160px] object-contain' src={url} alt="Selected" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='w-full text-center text-[100px] flex justify-center text-gray-400 font-semibold'>
                        <VscCloudUpload />
                      </div>
                      <div className='w-full text-center'>
                        <span className='text-center text-[#434343]'>Drag and drop or</span>
                        <span className='text-center text-[#AE56EF] cursor-pointer' onClick={() => imageRef.current.click()}> Click to Browse</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='w-full mx-auto'>
                  <div>
                    <Input
                      type="file"
                      hidden
                      {...register('image', { required: 'Image is required!' })}
                      onChange={handleFile}
                      accept="image/*"
                      ref={imageRef}
                    />
                  </div>
                  {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                </div>
              </div>

              <Button className={`${loading ? "bg-[#c098de]  cursor-not-allowed " : " bg-[#AE56EF] hover:bg-[#8d48be]"} w-[100px] mt-3 px-3  text-[#f3f3f3] flex gap-1 justify-center items-center  py-2 rounded float-right`} type="submit">
                {loading ? (<Loading />) : <div className='flex justify-center items-center gap-1'>  <span><MdOutlineUpload /></span>
                  <span> Upload</span></div>}

              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
