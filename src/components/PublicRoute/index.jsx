import { useAuthValue } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuthValue();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
