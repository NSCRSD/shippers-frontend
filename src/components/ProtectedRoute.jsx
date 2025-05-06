// import React from 'react';
// import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  return  children
};

export default ProtectedRoute;

// const token = localStorage.getItem('token');
// return token ? children : <Navigate to="/login" />;