import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // Render nothing or a loading indicator while authentication status is being determined
  if (loading) {
    // You can replace this with a loading spinner or any loading component if you have one
    return <div>Loading...</div>;
  }

  // Navigate to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Navigate to login if the user is not an admin but trying to access an admin route
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  // Render the child routes if authenticated (and if admin check passes for admin routes)
  return <Outlet />;
};

export default PrivateRoutes;
