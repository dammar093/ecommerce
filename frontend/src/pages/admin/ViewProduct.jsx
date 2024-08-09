import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { MdOutlineUpload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setProductById } from '../../features/productSlice';
import { RxCross2 } from 'react-icons/rx';
const ViewProduct = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams();
  const { product } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)

  useEffect(() => {
    async function getProductById() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/get-product/${id}`)
        console.log(res.data);

        dispatch(setProductById(res.data.data))
      } catch (error) {
        console.log(error);

      }
    }
    getProductById()
  }, [id])

  const updateProduct = async (data) => {
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
      const res = await axios.post(`${baseUrl}/api/v1/products`, formData, {
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
  return (
    <div className='w-full relative flex mb-20 md:mb-2'>
      <div>
        <SideBar />
      </div>
      <div className='md:ml-[13vw] w-full'>
        <h2 className='my-3 text-md  md:text-xl font-bold text-gray-600 capitalize'>{product.title}</h2>
        <div className='grid grid-cols-4 gap-1'>
          {
            product.images.map(img => (
              <div className='w-[20vw] h-[20vw] bg-white p-2 rounded hover:shadow-2xl'>
                <img className='w-full h-full object-contain' src={img} alt={product.title} />
              </div>
            ))
          }
        </div>
        <div className='bg-white w-full mt-3 rounded py-2'>
          <form className='px-2' method='post'>
            <div className='mt-2'>
              <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                <label className='font-semibold' htmlFor='title'>Product Name</label>
                <Input
                  type="text"
                  className="w-full h-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                  value={product.title}
                  // readOnly={edit}
                  {...register('title', {
                    required: 'Title is required!',
                  })}
                  // onChange={handleInputChange(setFullName)}
                  id={"title"}
                />

              </div>
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className='mt-2 w-full grid-cols-1 grid md:grid-cols-4 gap-2'>
              <div className=' w-full md:w-fit'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                  <label className='font-semibold' htmlFor='price'>Price</label>
                  <Input
                    type="text"
                    className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                    value={Math.round(product.price - (product.price * product.discountPercentage / 100))}
                    // readOnly={edit}
                    {...register('price', {
                      required: 'Price is required!',
                    })}
                    // onChange={handleInputChange(setFullName)}
                    id={"price"}
                  />
                </div>
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </div>
              <div className='w-full md:w-fit'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                  <label className='font-semibold' htmlFor='stock'>Discount Percentage</label>
                  <Input
                    type="text"
                    className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                    value={product.discountPercentage}
                    // readOnly={edit}
                    min={0}
                    {...register('discount', {
                      required: 'Discount Percentage is required!',
                    })}
                    // onChange={handleInputChange(setFullName)}
                    id={"discount"}
                  />
                </div>
                {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
              </div>
              <div className='w-full md:w-fit'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                  <label className='font-semibold' htmlFor='stock'>Stock</label>
                  <Input
                    type="text"
                    className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                    value={product.stock}
                    // readOnly={edit}
                    {...register('stock', {
                      required: 'Stock is required!',
                    })}
                    // onChange={handleInputChange(setFullName)}
                    id={"stock"}
                  />
                </div>
                {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
              </div>
              <div className=' w-full md:w-fit'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                  <label className='font-semibold' htmlFor='price'>Brand</label>
                  <Input
                    type="text"
                    className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none text-left"
                    value={String(product.brand).trim()}
                    // readOnly={edit}
                    {...register('brand', {
                      required: 'Brand required!',
                    })}
                    // onChange={handleInputChange(setFullName)}
                    id={"brand"}
                  />
                </div>
                {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
              </div>
            </div>
            <div className='mt-2 w-full grid-cols-1 grid md:grid-cols-3 gap-2'>

              <div className='w-full md:w-fit'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                  <label className='font-semibold' htmlFor='category'>Category</label>
                  <select
                    className='w-full h-full bg-transparent capitalize focus:outline-none'
                    value={product.category}

                    {...register('category', { required: 'Category is required !' })}
                  >
                    {categories.map((item) => (
                      <option
                        className='text-gray-600 text-md capitalize'
                        value={item.title} key={item._id}

                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
              </div>
              {
                product.colors && <div className='w-full md:w-fit'>
                  <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                    <label className='font-semibold' htmlFor='colors'>Colors</label>
                    <Input
                      type="color"
                      className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                      value={product.stock}
                      // readOnly={edit}
                      {...register('colors',)}
                      // onChange={handleInputChange(setFullName)}
                      id={"colors"}
                    />
                  </div>
                  <div className='flex gap-1 m-2'>
                    {product?.colors.map((clr) => (
                      <div
                        className='w-fit p-1 border border-gray-900 rounded-full flex justify-between items-center'
                        key={clr}
                      >
                        <div className='w-[20px] h-[20px] rounded-full border border-gray-600' style={{ backgroundColor: clr }}></div>
                        <RxCross2 className='text-xl cursor-pointer' onClick={() => (clr)} />
                      </div>
                    ))}
                  </div>

                </div>
              }
              {
                product.sizes &&
                <div className=' w-full md:w-fit'>
                  <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                    <label className='font-semibold' htmlFor='price'>Sizes</label>
                    <Input
                      type="text"
                      className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none text-left"
                      value={String(product.brand).trim()}
                      // readOnly={edit}
                      {...register('size')}
                      // onChange={handleInputChange(setFullName)}
                      id={"brand"}
                    />
                  </div>
                </div>
              }
            </div>
            <div className='mt-2'>
              <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                <label className='font-semibold' htmlFor='desc'>Description</label>
                <textarea id="desc" cols="30" rows="5" className="w-full h-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none resize-none"
                  {...register('description', {
                    required: 'Description is required!',
                  })}
                  value={product.description}
                ></textarea>
              </div>
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct