// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const isValid = isTokenValid();

  console.log('Token valid:', isValid); // Debugging line

  if (!isValid) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
