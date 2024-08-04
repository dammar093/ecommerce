import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IsLogedIn = ({ children }) => {
  const user = useSelector(state => state.user.user);

  if (user) {
    return (
      <>
        <Navigate to="/" />
      </>
    )
  }
  else {
    return <>
      {children}
    </>
  }
};

export default IsLogedIn;
