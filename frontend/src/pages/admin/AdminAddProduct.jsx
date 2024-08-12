import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../../components/admin/SideBar';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { VscCloudUpload } from 'react-icons/vsc';
import { MdOutlineUpload } from 'react-icons/md';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { RxCross2 } from 'react-icons/rx';
import { IoAddCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addProductToState } from '../../features/productSlice';

const AdminAddProduct = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const { categories } = useSelector((state) => state.categories);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [color, setColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const imageRef = useRef();
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 4) {
      setError('Add less than 5 files');
      return;
    }

    const newImageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newImageUrls]);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setValue('images', [...files, ...selectedFiles]);
  };

  const removeImage = (image) => {
    setImageUrls((prev) => prev.filter((item) => item !== image));
  };

  const addColor = () => {
    if (!color) return;
    setColors((prev) => [...prev, color]);
    setColor(null);
  };

  const removeColor = (color) => {
    setColors((prev) => prev.filter((clr) => clr !== color));
  };

  const addSize = () => {
    if (!size) return;
    setSizes((prev) => [...prev, size]);
    setSize(null);
  };

  const removeSize = (size) => {
    setSizes((prev) => prev.filter((sz) => sz !== size));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFiles = Array.from(e.dataTransfer.files);
    if (selectedFiles.length > 4) {
      setError('Add less than 5 files');
      return;
    }

    const newImageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newImageUrls]);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setValue('images', [...files, ...selectedFiles]);
  };

  const addProduct = async (data) => {
    console.log(sizes, colors);
    data.colors = colors;
    data.sizes = sizes;
    console.log(data)
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'images') {
        files.forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      dispatch(addProductToState(res.data.data))
      navigate("/admin-products")
      setLoading(prev => !prev)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "Admin Add Product"
  })
  // fetched products
  return (
    <div className='w-full relative flex mb-20'>
      <SideBar />
      <div className='m-0 mt-2 md:ml-[13vw] w-full bg-[#ffffff] p-2 rounded'>
        <div className='w-full'>
          <h2 className='text-gray-600 text-xl font-medium uppercase'>Add your product</h2>
          <form
            method='post'
            encType='multipart/form-data'
            onSubmit={handleSubmit(addProduct)}
          >
            <div className='flex justify-between flex-wrap gap-2 mt-4'>
              <div className='md:w-[48%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <Input
                    type='text'
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    placeholder='Enter title of product'
                    {...register('title', { required: 'Title is required !' })}
                  />
                </div>
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
              </div>
              <div className='md:w-[20%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <select
                    className='w-full h-full bg-transparent capitalize'
                    {...register('category', { required: 'Category is required !' })}
                  >
                    <option className='text-gray-600 text-md capitalize' value=''>
                      Select Category
                    </option>
                    {categories.map((item) => (
                      <option className='text-gray-600 text-md capitalize' value={item.title} key={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
              </div>
              <div className='md:w-[28%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <Input
                    type='text'
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    placeholder='Enter brand of product'
                    {...register('brand', { required: 'Brand is required !' })}
                  />
                </div>
                {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
              </div>
            </div>
            <div className='flex justify-between flex-wrap gap-2 mt-4'>
              <div className='md:w-[31%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <Input
                    type='number'
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    min={0}
                    placeholder='Enter price of product'
                    {...register('price', { required: 'Price is required !' })}
                  />
                </div>
                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
              </div>
              <div className='md:w-[31%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <Input
                    type='number'
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    min={0}
                    placeholder='Enter discount percentage of product'
                    {...register('discount', { required: 'Discount is required !' })}
                  />
                </div>
                {errors.discount && <p className='text-red-500'>{errors.discount.message}</p>}
              </div>
              <div className='md:w-[31%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600'>
                  <Input
                    type='number'
                    min={0}
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    placeholder='Enter quantity of product'
                    {...register('quantity', { required: 'Quantity is required !' })}
                  />
                </div>
                {errors.quantity && <p className='text-red-500'>{errors.quantity.message}</p>}
              </div>
            </div>
            <div className='flex justify-between flex-wrap gap-2 mt-2'>
              <div className='md:w-[70%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600 flex items-center'>
                  <Input
                    type='color'
                    className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Button
                    className='bg-[#AE56EF] h-full hover:bg-[#8d48be] text-[#f3f3f3] p-1 rounded'
                    type='button'
                    onClick={addColor}
                  >
                    <div className='flex justify-center text-md items-center gap-1'>
                      <span><IoAddCircleOutline /></span>
                      <span>Add</span>
                    </div>
                  </Button>
                </div>
                <div className='flex gap-1 items-center'>
                  {colors.map((clr) => (
                    <div
                      className='w-[60px] p-1 border border-gray-900 rounded-full flex justify-between items-center'
                      key={clr}
                    >
                      <div className='w-[20px] h-[20px] rounded-full border border-gray-600' style={{ backgroundColor: clr }}></div>
                      <RxCross2 className='text-xl cursor-pointer' onClick={() => removeColor(clr)} />
                    </div>
                  ))}
                </div>
              </div>
              <div className='md:w-[28%] w-full'>
                <div className='w-full h-10 rounded-md bg-slate-200 text-gray-600 flex items-center'>
                  <Input
                    className='w-full h-full uppercase bg-transparent px-2'
                    placeholder="Enter size eg: M,X or 23"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />

                  <Button
                    className='bg-[#AE56EF] h-full hover:bg-[#8d48be] text-[#f3f3f3] p-1 rounded'
                    type='button'
                    onClick={addSize}
                  >
                    <div className='flex justify-center text-md items-center gap-1'>
                      <span><IoAddCircleOutline /></span>
                      <span>Add</span>
                    </div>
                  </Button>
                </div>
                <div className='flex gap-1 items-center uppercase mt-2'>
                  {sizes.map((sz) => (
                    <div
                      className='w-[60px] p-1 border border-gray-900 rounded-full flex justify-between items-center'
                      key={sz}
                    >
                      <div className='w-[20px] h-[20px] rounded-full'>{sz}</div>
                      <RxCross2 className='text-xl cursor-pointer' onClick={() => removeSize(sz)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full mt-2'>
              <div
                className='w-full border-dashed border bg-slate-200 p-2 h-[200px] border-gray-800'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => setError(null)}
              >
                <div>
                  <div className='w-full text-center text-[100px] flex justify-center text-gray-400 font-semibold'>
                    <VscCloudUpload />
                  </div>
                  <div className='w-full text-center'>
                    <span className='text-center text-[#434343]'>Drag and drop or</span>
                    <span
                      className='text-center text-[#AE56EF] cursor-pointer'
                      onClick={() => {
                        imageRef.current.click();
                        setError(null);
                      }}
                    >
                      {' '}
                      Click to Browse
                    </span>
                  </div>
                </div>
              </div>
              <Input
                type='file'
                multiple
                hidden
                {...register('images', { required: 'Images are required!' })}
                accept='image/*'
                onChange={handleFiles}
                ref={imageRef}
              />
              <div className='flex gap-2 mt-2'>
                {imageUrls.map((url, index) => (
                  <div className='w-[100px] h-[100px] relative' key={index}>
                    <img className='object-cover h-full w-full' src={url} alt={`Image ${index}`} />
                    <span
                      className='float-right text-md flex items-center justify-center text-[#f3f3f3] cursor-pointer absolute top-0 right-0 w-[20px] h-[20px] bg-red-400 rounded-full'
                      onClick={() => removeImage(url)}
                    >
                      <RxCross2 />
                    </span>
                  </div>
                ))}
                {errors.images && <p className='text-red-500'>{errors.images.message}</p>}
                {error && <p className='text-red-500'>{error}</p>}
              </div>
            </div>
            <div className='w-full mt-2'>
              <div className='w-full rounded-md text-gray-600'>
                <textarea
                  className='w-full bg-slate-200 p-2 rounded resize-none focus:border-gray-600 focus:border'
                  placeholder='Write description..'
                  {...register('description')}
                  cols='30'
                  rows='10'
                ></textarea>
              </div>
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            </div>
            <div className='w-full'>
              <Button
                className={`${loading ? 'bg-[#c098de] cursor-not-allowed' : 'bg-[#AE56EF] hover:bg-[#8d48be]'} w-[100px] mt-3 px-3 text-[#f3f3f3] flex gap-1 justify-center items-center py-2 rounded float-right`}
                type='submit'
                disabled={loading}
              >
                {loading ? <Loading /> : (
                  <div className='flex justify-center items-center gap-1'>
                    <span><MdOutlineUpload /></span>
                    <span> Upload</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
