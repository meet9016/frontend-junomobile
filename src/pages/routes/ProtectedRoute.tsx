import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // const auth_token = localStorage.getItem("auth_token");

  // if (!auth_token) {
    return <Navigate to="/login" replace />;
  // }

  // return <Outlet />;
};
                                     
export default ProtectedRoute;
 