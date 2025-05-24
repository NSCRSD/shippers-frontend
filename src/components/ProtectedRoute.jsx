import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("token:", token)

  if (!token) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;