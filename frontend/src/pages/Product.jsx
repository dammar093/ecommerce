import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Products from '../components/Products'
import { FiPlus, FiMinus } from "react-icons/fi";
import Rating from '../components/Rating'
import Review from '../components/Review'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { CgShoppingCart } from "react-icons/cg";
import { setProductById, setRelatedProduct } from '../features/productSlice';
import baseUrl from '../baseUrl';
import axios from 'axios';

const Product = () => {

  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const [sizeIndex, setSizeIndex] = useState(0)
  const quanitiyRef = useRef()
  const dispatch = useDispatch();
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const { product, relatedProduct } = useSelector(state => state.products);

  const { user } = useSelector(state => state.user);
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    // get product
    async function getProduct() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/get-product/${id}`)
        // console.log(res);

        dispatch(setProductById(res.data.data))
      } catch (error) {
        console.log(error);
      }

    }
    getProduct()
    // get related products
    async function getRelatedProduct() {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/products/related-product/${product.category}`)
        dispatch(setRelatedProduct(res.data.data))
      } catch (error) {
        console.log(error);
      }

    }
    getRelatedProduct()
  }, [id, dispatch, product.category])

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }




  const handelCart = (item) => {
    if (user) {
      dispatch(addToCart(item))
    }
    else { navigate("/login") }
  }
  const handelImg = (i) => {
    setImageIndex(i)
  }
  return (
    <section className='my-4 w-full mb-[70px]'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full md:w-1/2 bg-white py-2 h-fit'>
          <div className='w-full md:h-[350px] p-1 flex items-center justify-center'>
            <img className='w-[300px] h-[300px] object-scale-down'
              src={product?.images[imageIndex]}
              alt={product.title} />
          </div>
          <div className='w-full my-2'>
            <div className='flex justify-center gap-2'>
              {
                product.images.map((img, index) => (
                  <div className={`${index === imageIndex ? "border-2 border-[#AE56EF]" : "border"} rounded w-[100px] h-[100px]  shadow-sm p-1`} key={img}
                    onClick={() => handelImg(index)}
                  >
                    <img className='w-full h-full object-contain cursor-pointer' src={img} alt="" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2 p-2 flex flex-col justify-between'>
          <div className='w-full grid grid-rows-1'>
            <h2 className='text-xl font-semibold uppercase text-[#AE56EF]'>{product.title}</h2>
            <div className='my-2'>
              <div className='font-medium'>
                <span className='text-gray-700 capitalize'>Category: </span>
                <span className='text-[#AE56EF] capitalize '>{product.category} </span>
              </div>
              <div className='font-medium'>
                <span className='text-gray-700 capitalize'>Brand: </span>
                <span className='text-[#AE56EF] capitalize '>{product.brand} </span>
              </div>
              <div className='font-medium'>
                <span className='capitalize text-gray-600'>Stock: </span>
                <span className='capitalize text-[#AE56EF]'>{product.stock > 0 ? "Instock" : "Out of stock"}</span>
              </div>

              {
                product.rating > 0 && <div className='flex items-center gap-2'>
                  <Rating rating={product.rating} />
                  <span className='text-gray-600'>(100)</span>
                </div>
              }
            </div>
            <div className='my-2 text-gray-600 text-justify'>
              <p>{product.description}</p>
            </div>
            <div className='my-2 flex gap-3 items-center'>
              <span className='text-3xl font-medium text-[#AE56EF]'>Rs.{Math.round(product.price - (product.discountPercentage * product.price / 100))}</span>
              <span className='text-2xl font-medium text-gray-600 line-through'>Rs.{product.price}</span>
              {product.discountPercentage > 0 && <span className='text-red-500 font-semibold md:text-lg text-md'>-{product.discountPercentage}%</span>}
            </div>
          </div>
          {
            product.colors && <div className='flex gap-2'>
              <span className='text-gray-600'>{product.colors.length > 0 && "Colors:"}</span>
              <div className='flex gap-2'>
                {
                  product.colors.map((color, index) => (
                    <div key={color}
                      className={` ${index === colorIndex ? " border-2 border-[#AE56EF]" : "border border-gray-600"} w-8 h-8 cursor-pointer  rounded-full flex justify-center items-center `}
                    >
                      <div style={{ background: `${color}` }}
                        className='w-6 h-6 rounded-full'
                        onClick={() => {
                          setColor(color)
                          setColorIndex(index)
                        }}>

                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          }

          {
            product.sizes && <div className='flex gap-2 mt-2'>
              <span className='text-gray-600'>{product.sizes.length > 0 && "Size:"}</span>
              <div className='flex gap-2 text-gray-600 '>
                {
                  product.sizes.map((size, index) => (
                    <div key={size} className={`${index === sizeIndex ? " border-2 border-[#AE56EF]" : "border"} w-8 h-8 text-center text-md rounded flex justify-center items-center cursor-pointer uppercase border`}
                      onClick={() => {
                        setSize(size)
                        setSizeIndex(index)
                      }
                      }>{size}</div>
                  ))
                }
              </div>
            </div>
          }
          <div className='my-4 flex items-center gap-2'>
            <div className='flex gap-2'>
              <div className='w-[40px] h-[40px] border border-gray-700 flex justify-center items-center cursor-pointer' onClick={decreaseQuantity}>
                <FiMinus className='text-xl text-gray-700 font-medium' />
              </div>
              <Input
                className="w-[60px] h-[40px] outline-none px-1 text-center border border-gray-700 bg-transparent"
                type="text"
                ref={quanitiyRef}
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <div className='w-[40px] h-[40px] border border-gray-700 flex justify-center items-center cursor-pointer' onClick={increaseQuantity}>
                <FiPlus className='text-xl text-gray-700 font-medium' />
              </div>
            </div>

            <div>
              <Button
                type="button"
                className="px-6 py-2 bg-[#AE56EF] 
                rounded-full text-white
                hover:bg-[#793da4] transition-all uppercase
                flex font-semibold
                justify-center
                items-center
                gap-1
                "
                onClick={
                  () => {
                    handelCart({
                      _id: product._id || '',
                      color: color || product?.colors?.[0] || null,
                      image: product?.images?.[0] || null,
                      size: size || product?.sizes?.[0] || '',
                      price: Math.round(product.price - (product.discountPercentage * product.price / 100)) || 0,
                      quantity: quantity,
                      title: product.title
                    })
                  }}
              >

                <span className='font-semibold text-xl'><CgShoppingCart /></span>
                <span> Add To cart</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='my-8 w-full'>
          <h3 className='my-2 text-gray-600 font-medium text-xl'>Reviews <span>(10)</span></h3>
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </div>
      <div className='my-8'>
        <Products title="Related Products" products={relatedProduct} />
      </div>
    </section>
  )
}

export default Product