import { Navigate, Outlet } from "react-router";

import { AuthService } from "../utils/services/authService";

const PrivateGuard = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateGuard;
