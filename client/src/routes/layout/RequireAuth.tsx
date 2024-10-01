import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store"; // Ensure correct path to the store
import Navbar from "../../components/Navbar";

function RequireAuth() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);                // Get the isAuthenticated state from Redux
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component with Navbar
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default RequireAuth;
