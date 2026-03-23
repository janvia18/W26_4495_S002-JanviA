import { Navigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useProgress();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;