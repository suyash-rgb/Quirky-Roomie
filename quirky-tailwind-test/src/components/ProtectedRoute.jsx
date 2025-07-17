import { Navigate } from "react-router-dom";
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();
  console.log("PrivateRoute authToken:", authToken);

  return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
