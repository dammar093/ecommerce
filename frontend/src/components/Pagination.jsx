import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";


export default function Pagination({ total, url, handler, setPage }) {
  const [index, setIndex] = useState(0)
  const dispatch = useDispatch()
  async function handlePaginate(page) {
    // console.log(page);
    setPage(page)
    setIndex(page - 1)
    try {
      const res = await axios.get(`${url}/${page}`)
      dispatch(handler(res.data.data))
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 ">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{total}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1" aria-label="Pagination">
            {
              Array.from({ length: (Math.ceil(total / 12)) }).map((item, i) => {
                return (
                  <span
                    key={i}
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${index == i ? "bg-[#AE56EF] text-[#f3f3f3]" : "border border-[#AE56EF] text-[#AE56EF]"} px-4 py-2 text-sm font-semiboldfocus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AE56EF] cursor-pointer rounded`}
                    onClick={() => handlePaginate(i + 1)}
                  >
                    {(i + 1)}
                  </span>
                )
              })
            }

          </nav>
        </div>
      </div>
    </div>
  )
}
