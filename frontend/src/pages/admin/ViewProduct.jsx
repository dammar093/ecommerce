import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToState, setProductById } from '../../features/productSlice';
import { RxCross2 } from 'react-icons/rx';
import Button from '../../components/Button';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdOutlineCancel, MdOutlineModeEditOutline } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
const ViewProduct = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams();
  const { product } = useSelector(state => state.products)
  const { token } = useSelector(state => state.user)
  // console.log(product);
  const { categories } = useSelector(state => state.categories)
  const [title, setTitle] = useState(null)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  const [sizes, setSizes] = useState([])
  const [description, setDescription] = useState(null)
  const [edit, setEdit] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/get-product/${id}`);
        // console.log(res.data);

        dispatch(setProductById(res.data.data));
        document.title = res.data.data.title;
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();


  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      setTitle(product?.title || '');
      setPrice(product?.price || 0);
      setDiscountPercentage(product?.discountPercentage || 0);
      setDescription(product?.description || '');
      setStock(product?.stock || 0)
      setColors(product?.colors || [])
      setSizes(product?.sizes || [])
      setBrand(product?.brand || '')
      setCategory(product?.category || '')
      setValue('title', product?.title || '');
      setValue('price', product?.price || 0);
      setValue('discount', product?.discountPercentage || 0);
      setValue('description', product?.description || '')
      setValue('stock', product?.stock || 0)
      setValue('colors', product?.colors || [])
      setValue('sizes', product?.sizes || [])
      setValue('brand', product?.brand || '')
      setValue('category', product?.category || '')
    }
  }, [product, setValue])


  // fucntion to update products data
  const updateProduct = async (data) => {

    data.colors = colors;
    data.sizes = sizes;
    // console.log(data)
    setLoading(true)
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/products`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true
      })
      dispatch(addProductToState(res.data.data))
      navigate("/admin-products")
      setLoading(prev => !prev)
    } catch (error) {
      console.log(error);
      setLoading(false)

    }

  };

  // add color
  const addColor = () => {
    if (!color) return;
    setColors((prev) => [...prev, color]);
    setColor(null);
  };

  // delete color
  const removeColor = (color) => {
    setColors((prev) => prev.filter((clr) => clr !== color));
  };
  //add size
  const addSize = () => {
    if (!size) return;
    setSizes((prev) => [...prev, size]);
    setSize(null);
  };
  //delete size
  const removeSize = (size) => {
    setSizes((prev) => prev.filter((sz) => sz !== size));
  };

  return (
    <div className='w-full relative flex mb-20 md:mb-2'>
      <div>
        <SideBar />
      </div>
      {
        product && <div className='md:ml-[13vw] w-full'>
          <h2 className='my-3 text-md  md:text-xl font-bold text-gray-600 capitalize'>{product?.title}</h2>
          <div className='grid grid-cols-4 gap-1'>
            {
              product?.images.map(img => (
                <div className='w-[20vw] h-[20vw] bg-white p-2 rounded hover:shadow-2xl'>
                  <img className='w-full h-full object-contain' src={img} alt={product?.title} />
                </div>
              ))
            }
          </div>
          <div className='bg-white w-full mt-3 rounded py-2 px-2'>
            <div className='w-full flex justify-end mt-4'>
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

                  }
                  }
                >
                  <span>< MdOutlineCancel /></span> <span>cancel</span></Button>)
              }
            </div>
            <form className='px-2' method='post' onSubmit={handleSubmit(updateProduct)}>
              <input type="text" hidden value={product._id} {...register('id')} />
              <div className='mt-2'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                  <label className='font-semibold' htmlFor='title'>Product Name</label>
                  <Input
                    type="text"
                    className="w-full h-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"
                    readOnly={edit}
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
                      readOnly={edit}
                      {...register('price', {
                        required: 'Price is required!',
                      })}
                      onChange={(e) => setPrice(Number(e.target.value))}
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
                      readOnly={edit}
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
                <div className='text-gray-600'>
                  <label className='font-semibold' htmlFor='stock'>Price After discount</label>
                  <p className='border-b border-gray-800'>Rs. {Math.round(price - price * discountPercentage / 100)}</p>
                </div>
                <div className='w-full md:w-fit'>
                  <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                    <label className='font-semibold' htmlFor='stock'>Stock</label>
                    <Input
                      type="text"
                      className="w-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none"

                      readOnly={edit}
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

                      readOnly={edit}
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
              <div className='mt-2 w-full grid-cols-1 grid md:grid-cols-3 items-center gap-2'>
                <div className='w-full md:w-fit'>
                  <div className='w-full border-b border-gray-600 text-gray-600 px-2'>
                    <label className='font-semibold' htmlFor='category'>Category</label>
                    <select
                      className='w-full h-full bg-transparent capitalize focus:outline-none'
                      disabled={edit}
                      {...register('category', { required: 'Category is required !' })}
                    >
                      {categories.map((item) => (
                        <option
                          className='text-gray-600 text-md capitalize'
                          key={item.title}

                        >
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>
                {/* colors */}
                {
                  colors.length > 1 && <div className='flex justify-between flex-wrap gap-2 mt-2'>
                    <div className='md:[60%] w-full'>
                      {!edit && <div className='w-full  h-10 rounded-md bg-slate-200 text-gray-600 flex items-center'>

                        <Input
                          id="color"
                          onChange={(e) => setColor(e.target.value)}
                          type='color'
                          className='w-full h-full bg-transparent text-gray-600 rounded outline-none px-2'
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

                      </div>}

                      <div className='flex gap-1 items-center mt-2'>
                        {colors.length > 1 && colors.map((clr) => (
                          <div
                            className='w-[60px] p-1 border border-gray-900 rounded-full flex justify-between items-center'
                            key={clr}
                          >
                            <div className='w-[20px] h-[20px] rounded-full border border-gray-600' style={{ backgroundColor: clr }}></div>
                            {!edit && <RxCross2 className='text-xl cursor-pointer' onClick={() => removeColor(clr)} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                {
                  sizes.length > 1 && <div className='flex justify-between flex-wrap gap-2 '>
                    <div className='md:[60%] w-full'>
                      {!edit && <div className='w-full  h-10 rounded-md bg-slate-200 text-gray-600 flex items-center'>

                        <Input
                          className='w-full h-full uppercase bg-transparent px-2'
                          placeholder="Enter size eg: M,X, Xl and 23"
                          onChange={(e) => setSize(e.target.value.trim())}

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

                      </div>}
                      <div className='flex gap-1 items-center uppercase mt-2'>
                        {sizes.map((sz) => (
                          <div
                            className='w-[60px] p-1 border border-gray-900 rounded-full flex justify-between items-center text-gray-600'
                            key={sz}
                          >
                            <div className='w-[20px] h-[20px] rounded-full '>{sz}</div>
                            <RxCross2 className='text-xl cursor-pointer' onClick={() => removeSize(sz)} />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                }
              </div>
              <div className='mt-2'>
                <div className='w-full border-b border-gray-600 text-gray-600 px-2'>

                  <label className='font-semibold' htmlFor='desc'>Description</label>
                  <textarea id="desc" cols="30" rows="4" className="w-full h-full focus:border-none capitalize bg-transparent text-gray-600 rounded outline-none resize-none"
                    {...register('description', {
                      required: 'Description is required!',
                    })}

                  ></textarea>
                </div>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
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
        </div >
      }
    </div >
  )
}

export default ViewProduct