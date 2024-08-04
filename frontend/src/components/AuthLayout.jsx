import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children }) => {
  const user = useSelector(state => state.user.user);
  if (user) {
    return (
      <>
        {children}
      </>
    )
  }
  else {
    return (
      <>
        <Navigate to="/login" />
      </>
    )
  }
};

export default AuthLayout;
