// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
