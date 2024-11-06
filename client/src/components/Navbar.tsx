import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'; 
import { logout } from '../features/authSlice';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen); // Toggle dropdown
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="relative w-full flex h-20 bg-black rounded-sm">
      <div className="container flex justify-between w-11/12 mx-auto">
        <div className="logo font-bold font-serif text-3xl flex  justify-center items-center text-yellow-500 gap-4">
          <FaHandHoldingHeart className='text-5xl'/>
          <Link to="/" className="lg:hidden xl:block text-white">CareNest</Link>
        </div>

        <div className="listItems space-x-10 justify-center items-center font-bold font-serif text-2xl hidden text-white lg:flex xl:flex">
          <Link to="/plans">Plans</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blogs</Link>
          <Link to="/services">Services</Link>
          {isAuthenticated ? (
            <>
              {/* Dropdown for Doctor and Clubs */}
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="flex items-center gap-1 focus:outline-none"
                >
                  Contact
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                    <Link 
                      to="/doctor" 
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)} 
                    >
                      Doctor
                    </Link>
                    <Link 
                      to="/patient" 
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Patient
                    </Link>
                    <Link 
                      to="/clubs" 
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)} 
                    >
                      Clubs
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/profile">Stats</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        <div className="sidebar md lg:hidden xl:hidden flex justify-center items-center">
          <IoMenu onClick={toggleMenu} className="text-3xl cursor-pointer text-blue-200" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-gray-800 z-20 text-white transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-3xl">&times;</button>
        </div>
        <nav className="flex flex-col items-center space-y-12 text-2xl font-bold font-serif text-orange-500">
          <Link to="/plans" className="py-2">Plans</Link>
          <Link to="/about" className="py-2">About</Link>
          <Link to="/blog" className="py-2">Blogs</Link>
          <Link to="/services" className="py-2">Services</Link>
          {isAuthenticated ? (
            <>
              <Link to="/" onClick={handleLogout} className="py-2">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2">Login</Link>
              <Link to="/register" className="py-2">Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
