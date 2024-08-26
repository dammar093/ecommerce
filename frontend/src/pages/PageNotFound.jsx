import React, { useEffect } from 'react'
import page from "../assets/page.gif"
import Container from "../components/Container"
const PageNotFund = () => {
  useEffect(() => {
    document.title = "404 page not found"
  }, [])
  return (
    <Container>
      <div className='w-full h-[80vh] flex justify-center items-center text-3xl font-semibold text-slate-600 animate-pulse uppercase'>
        404 page not found
      </div>
    </Container>
  )
}

export default PageNotFund