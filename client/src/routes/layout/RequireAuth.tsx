import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store"; 
import Navbar from "../../components/Navbar";

function RequireAuth() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);            
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
