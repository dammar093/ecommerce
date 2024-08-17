import React from 'react'
import esewa from "../assets/esewa.png"
import Button from '../components/Button'

const Esewa = ({ data }) => {
  return (
    <section className='w-full md:h-[80vh] h-full bg-[#808080de] absolute top-0 bottom-0 flex md:items-center justify-center'>
      <form className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-[60%] h-fit  bg-white p-4 rounded'
        action={data?.url}
        method='post'>
        <div className='text-gray-600 w-full'>
          <label htmlFor="amount">Amount</label>
          <div>
            <input className="p-2 w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="amount" name="amount" value={data?._doc.totalAmount} required

            />
          </div>
        </div>
        <div className='text-gray-600 w-full'>
          <label htmlFor="tax_amount">Tax Amount</label>
          <div>
            <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="tax_amount" name="tax_amount" value="0" required

            />
          </div>
        </div>
        <div className='text-gray-600 w-full'>
          <label htmlFor="total_amount">Total Amount</label>
          <div>
            <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="total_amount" name="total_amount" value={data?._doc.totalAmount} required
            />
          </div>
        </div>
        <input readOnly={true} type="hidden" id="transaction_uuid" name="transaction_uuid" value={data?._doc._id} required

        />
        <div className='text-gray-600 w-full'>
          <label htmlFor="product_code">Product Code</label>
          <div>
            <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="product_code" name="product_code" value={data?.code} required

            />
          </div>
        </div>
        <div className='text-gray-600 w-full'>
          <label htmlFor="product_service_charge">Service Charge</label>
          <div>
            <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="product_service_charge" name="product_service_charge" value="0" required

            />
          </div>
        </div>
        <div className='text-gray-600 w-full'>
          <label htmlFor="product_delivery_charge">Delivery Charge</label>
          <div>
            <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required

            />
          </div>
        </div>

        <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="hidden" id="success_url" name="success_url"
          value={`http://localhost:8000/api/v1/orders/esewa`} required

        />
        <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly={true} type="hidden" id="failure_url" name="failure_url"
          value={`http://localhost:5173/esewa/fail`} required

        />
        <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" readOnly type="hidden" id="signed_field_names" name="signed_field_names"
          value="total_amount,transaction_uuid,product_code" required

        />

        <input className="p-2  w-full outline-none focus:border-none rounded bg-slate-200" type="hidden" id="signature" name="signature" value={data.signature} required

        />
        <div className='text-gray-600 w-full mt-2'>
          <Button type="submit" className="w-full bg-[#AE56EF] py-2 px-4 rounded-full font-semibold text-white hover:bg-[#8042ac] flex justify-center gap-1 items-center">
            <img className='w-6 h-6' src={esewa} alt="eSewa" /> <span>Pay with eSewa</span>
          </Button>
        </div>
      </form>
    </section >
  )
}

export default Esewa