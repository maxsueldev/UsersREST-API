import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return token && user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
