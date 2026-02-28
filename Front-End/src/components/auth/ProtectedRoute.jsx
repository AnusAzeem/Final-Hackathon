import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user); // Redux se user data nikaalna
  const token = useSelector((state) => state.user);
  // Agar token nahi hai to login pe bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role allowed list mein nahi hai to unauthorized page ya home pe bhejo
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate message="Access Denied" to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
