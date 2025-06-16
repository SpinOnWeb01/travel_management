import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { Spinner } from "@radix-ui/themes";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
