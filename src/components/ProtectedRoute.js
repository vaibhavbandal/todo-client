import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }) => {
  if (!useAuth()) {
    return <Navigate to='/' replace />;
  }

  return children;
};
