/**
 * Route guard: redirects to /login when no Supabase user.
 * Note: App.jsx uses an inline PrivateRoute with a loading state; use this where a simple redirect is enough.
 */
import { Navigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useProgress();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;