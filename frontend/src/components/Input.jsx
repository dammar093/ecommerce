import React, { useId } from 'react'

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId()
  return (
    <>
      {
        label && <label htmlFor={id}>{label}</label>
      }
      <input
        className={`focus:border-gray-600 focus:border ${className}`}
        type={type}
        ref={ref}
        id={id}
        {...props}
      />
    </>
  )
}

export default React.forwardRef(Input)