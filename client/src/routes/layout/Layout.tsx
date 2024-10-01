import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


function Layout() {
  return (
    <div className="outler">
        <div className="navbarContainer">
            <Navbar/>
        </div>

        <div className="outletContainer">
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout