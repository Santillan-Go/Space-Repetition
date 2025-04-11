import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const inUser = JSON.parse(localStorage.getItem("in")) || "";

  if (!inUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
