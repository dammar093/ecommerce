import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
  const user = useSelector(state => state.user.user);
  if (user?.role === "admin") {
    return (
      <>
        {children}
      </>
    )
  }
  else {
    return (<><Navigate to="/" /></>)
  }
}
export default AdminLayout;
