import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement; // The component to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists in localStorage

  return token ? children : <Navigate to="/" replace />; // Redirect to landing page if not authenticated
};

export default PrivateRoute;
